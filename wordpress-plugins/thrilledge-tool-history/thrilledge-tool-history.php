<?php
/**
 * Plugin Name: Thrill Edge - Tool Generation History
 * Description: Registers Tool Generation CPT and REST endpoints for Freelancer Toolkit history
 * Version: 1.0
 * Author: Thrill Edge Technologies
 */

// Prevent direct access
if (!defined('ABSPATH')) exit;

// Register Custom Post Type
add_action('init', 'te_register_tool_generation_cpt');
function te_register_tool_generation_cpt() {
    $args = [
        'public'             => false,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'show_in_rest'       => true,
        'rest_base'          => 'tool-generation',
        'menu_icon'          => 'dashicons-clipboard',
        'labels' => [
            'name'               => 'Tool Generations',
            'singular_name'      => 'Tool Generation',
            'add_new'            => 'Add New',
            'add_new_item'       => 'Add New Generation',
            'edit_item'          => 'Edit Generation',
            'view_item'          => 'View Generation',
            'search_items'       => 'Search Generations',
            'not_found'          => 'No generations found',
            'not_found_in_trash' => 'No generations found in Trash',
        ],
        'supports' => ['title', 'custom-fields'],
        'capability_type' => 'post',
    ];
    register_post_type('tool_generation', $args);
}

// Register meta fields for REST API
add_action('rest_api_init', 'te_register_tool_meta');
function te_register_tool_meta() {
    $meta_fields = [
        'tool_type'    => ['type' => 'string',  'description' => 'proposal | cold-email | cold-call'],
        'clerk_user_id'=> ['type' => 'string',  'description' => 'Clerk user ID'],
        'user_email'   => ['type' => 'string',  'description' => 'User email address'],
        'input_data'   => ['type' => 'string',  'description' => 'JSON input parameters'],
        'output_data'  => ['type' => 'string',  'description' => 'Generated output text'],
    ];

    foreach ($meta_fields as $key => $args) {
        register_post_meta('tool_generation', $key, [
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => $args['type'],
            'description'   => $args['description'],
            'auth_callback' => '__return_true',
        ]);
    }
}

// Custom endpoint: GET generations by clerk_user_id
add_action('rest_api_init', 'te_add_custom_endpoints');
function te_add_custom_endpoints() {
    register_rest_route('te-tools/v1', '/history/(?P<clerk_id>[a-zA-Z0-9_-]+)', [
        'methods'             => 'GET',
        'callback'            => 'te_get_user_history',
        'permission_callback' => '__return_true',
        'args' => [
            'clerk_id' => [
                'required'          => true,
                'validate_callback' => fn($p) => is_string($p) && !empty($p),
            ],
            'limit' => [
                'default' => 50,
            ],
        ],
    ]);

    // Also register the POST save endpoint for convenience
    register_rest_route('te-tools/v1', '/save', [
        'methods'             => 'POST',
        'callback'            => 'te_save_generation',
        'permission_callback' => '__return_true',
    ]);
}

// Save a new generation
function te_save_generation(WP_REST_Request $request) {
    $params = $request->get_json_params();

    $required = ['tool_type', 'clerk_user_id', 'input_data', 'output_data'];
    foreach ($required as $field) {
        if (empty($params[$field])) {
            return new WP_REST_Response([
                'success' => false,
                'error'   => "Missing required field: $field",
            ], 400);
        }
    }

    $valid_tools = ['proposal', 'cold-email', 'cold-call'];
    if (!in_array($params['tool_type'], $valid_tools, true)) {
        return new WP_REST_Response([
            'success' => false,
            'error'   => 'Invalid tool_type. Must be one of: ' . implode(', ', $valid_tools),
        ], 400);
    }

    // Map tool type to display title prefix
    $tool_labels = [
        'proposal'   => 'Upwork Proposal',
        'cold-email' => 'Cold Email',
        'cold-call'  => 'Cold Call Script',
    ];

    $title = $tool_labels[$params['tool_type']] . ' - ' . gmdate('Y-m-d H:i');

    $post_id = wp_insert_post([
        'post_type'   => 'tool_generation',
        'post_title'  => $title,
        'post_status' => 'publish',
        'meta_input'  => [
            'tool_type'      => $params['tool_type'],
            'clerk_user_id'  => $params['clerk_user_id'],
            'user_email'     => $params['user_email'] ?? '',
            'input_data'     => is_string($params['input_data']) ? $params['input_data'] : wp_json_encode($params['input_data']),
            'output_data'    => $params['output_data'],
        ],
    ]);

    if (is_wp_error($post_id)) {
        return new WP_REST_Response([
            'success' => false,
            'error'   => $post_id->get_error_message(),
        ], 500);
    }

    return new WP_REST_Response([
        'success' => true,
        'id'      => $post_id,
    ], 201);
}

// Get history for a specific Clerk user
function te_get_user_history(WP_REST_Request $request) {
    $clerk_id = $request->get_param('clerk_id');
    $limit    = min((int) $request->get_param('limit'), 100);

    $posts = get_posts([
        'post_type'      => 'tool_generation',
        'posts_per_page' => $limit,
        'post_status'    => 'publish',
        'meta_key'       => 'clerk_user_id',
        'meta_value'     => $clerk_id,
        'orderby'        => 'date',
        'order'          => 'DESC',
    ]);

    $history = array_map(function ($post) {
        return [
            'id'           => $post->ID,
            'title'        => get_the_title($post),
            'tool_type'    => get_post_meta($post->ID, 'tool_type', true),
            'clerk_user_id'=> get_post_meta($post->ID, 'clerk_user_id', true),
            'user_email'   => get_post_meta($post->ID, 'user_email', true),
            'input_data'   => get_post_meta($post->ID, 'input_data', true),
            'output_data'  => get_post_meta($post->ID, 'output_data', true),
            'created_at'   => $post->post_date_gmt,
        ];
    }, $posts);

    return new WP_REST_Response([
        'success' => true,
        'data'    => $history,
        'total'   => count($history),
    ]);
}
