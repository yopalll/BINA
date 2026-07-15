<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    // Meta-Llama-3.1-8B-Instruct inference endpoint — powers P5 character
    // evaluation and second-layer sentiment/cyberbullying moderation.
    'llama' => [
        'base_url' => env('LLAMA_API_BASE_URL', 'https://api.groq.com/openai/v1'),
        'api_key' => env('LLAMA_API_KEY'),
        'model' => env('LLAMA_MODEL', 'llama-3.1-8b-instant'),
    ],

    // Microsoft Azure AI Speech — text-to-speech for the Dengar dan Baca module.
    'azure_speech' => [
        'key' => env('AZURE_SPEECH_KEY'),
        'region' => env('AZURE_SPEECH_REGION'),
        'voice' => env('AZURE_SPEECH_VOICE', 'id-ID-GadisNeural'),
    ],

];
