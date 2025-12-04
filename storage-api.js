/**
 * GitHub Gist Storage API
 * Handles loading and saving data to GitHub Gist
 * 
 * This module provides a clean interface for persisting portfolio data
 * to a GitHub Gist, including visitor analytics, messages, and statistics.
 * 
 * Dependencies:
 * - window.GITHUB_CONFIG: Must be defined in config.js
 * - window.appLogger: Must be defined for logging
 */

// Ensure storageAPI is always available
if (!window.storageAPI) {
    window.storageAPI = {};
}

window.storageAPI = {
    /**
     * Load data from GitHub Gist
     * @returns {Promise<Object|null>} Portfolio data object or null if failed
     */
    async load() {
        window.appLogger.trace('StorageAPI', 'load');
        
        const GITHUB_CONFIG = window.GITHUB_CONFIG;
        
        if (!GITHUB_CONFIG || !GITHUB_CONFIG.gistId) {
            window.appLogger.warn('StorageAPI', 'GitHub Gist not configured');
            return null;
        }
        
        try {
            window.appLogger.debug('StorageAPI', 'Fetching gist data', { gistId: GITHUB_CONFIG.gistId });
            const startTime = performance.now();
            
            const response = await fetch(`https://api.github.com/gists/${GITHUB_CONFIG.gistId}`);
            const fetchTime = performance.now() - startTime;
            
            window.appLogger.debug('StorageAPI', 'Fetch response received', { 
                status: response.status, 
                statusText: response.statusText,
                duration: `${fetchTime.toFixed(2)}ms`
            });
            
            if (!response.ok) {
                if (response.status === 404) {
                    window.appLogger.warn('StorageAPI', 'Gist not found', { 
                        gistId: GITHUB_CONFIG.gistId,
                        status: response.status 
                    });
                } else {
                    window.appLogger.error('StorageAPI', 'Failed to load gist', new Error(`HTTP ${response.status}: ${response.statusText}`));
                }
                throw new Error(`Failed to load data: ${response.status} ${response.statusText}`);
            }
            
            const gist = await response.json();
            window.appLogger.debug('StorageAPI', 'Gist data parsed', { 
                fileCount: Object.keys(gist.files || {}).length,
                hasPortfolioData: !!gist.files['portfolio-data.json']
            });
            
            const content = gist.files['portfolio-data.json']?.content || '{}';
            const parsedData = JSON.parse(content);
            
            // Ensure data structure is complete
            const initialized = {
                stats: !parsedData.stats,
                visitors: !parsedData.visitors,
                messages: !parsedData.messages || !Array.isArray(parsedData.messages),
                analytics: !parsedData.analytics
            };
            
            if (!parsedData.stats) parsedData.stats = { totalVisits: 0, uniqueVisitors: 0, firstVisit: '', lastVisit: '' };
            if (!parsedData.visitors) parsedData.visitors = {};
            
            // Ensure messages is always an array (critical for message retention)
            if (!parsedData.messages || !Array.isArray(parsedData.messages)) {
                window.appLogger.warn('StorageAPI', 'Messages array missing or invalid, initializing empty array', {
                    messagesType: typeof parsedData.messages,
                    messagesValue: parsedData.messages
                });
                parsedData.messages = [];
            }
            
            if (!parsedData.analytics) parsedData.analytics = {
                visitsByDate: {}, visitsByHour: {}, visitsByReferrer: {},
                visitsByDevice: {}, visitsByCountry: {}
            };
            
            if (Object.values(initialized).some(v => v)) {
                window.appLogger.info('StorageAPI', 'Initialized missing data structures', initialized);
            }
            
            window.appLogger.info('StorageAPI', 'Data loaded successfully', {
                totalVisits: parsedData.stats?.totalVisits || 0,
                uniqueVisitors: parsedData.stats?.uniqueVisitors || 0,
                messageCount: parsedData.messages?.length || 0,
                messagesIsArray: Array.isArray(parsedData.messages)
            });
            
            window.appLogger.traceEnd('StorageAPI', 'load', { success: true });
            return parsedData;
        } catch (error) {
            window.appLogger.error('StorageAPI', 'Error loading data', error);
            window.appLogger.traceEnd('StorageAPI', 'load', { success: false });
            return null;
        }
    },
    
    /**
     * Save data to GitHub Gist
     * @param {Object} data - Portfolio data object to save
     * @returns {Promise<boolean>} True if successful, throws error if failed
     */
    async save(data) {
        window.appLogger.trace('StorageAPI', 'save', { 
            dataSize: JSON.stringify(data).length,
            hasStats: !!data.stats,
            hasMessages: !!data.messages,
            messageCount: data.messages?.length || 0,
            visitorCount: Object.keys(data.visitors || {}).length
        });
        
        // Validate data structure before saving (ensure message retention)
        if (!data) {
            const error = new Error('Cannot save: data is null or undefined');
            error.name = 'ValidationError';
            window.appLogger.error('StorageAPI', 'Save validation failed', { error: error.message });
            throw error;
        }
        
        // Ensure messages array exists and is preserved
        if (!Array.isArray(data.messages)) {
            window.appLogger.warn('StorageAPI', 'Messages array missing or invalid, initializing empty array', {
                messagesType: typeof data.messages,
                messagesValue: data.messages
            });
            data.messages = [];
        }
        
        // Ensure other required structures exist
        if (!data.stats) {
            data.stats = { totalVisits: 0, uniqueVisitors: 0, firstVisit: '', lastVisit: '' };
        }
        if (!data.visitors) {
            data.visitors = {};
        }
        if (!data.analytics) {
            data.analytics = {
                visitsByDate: {}, visitsByHour: {}, visitsByReferrer: {},
                visitsByDevice: {}, visitsByCountry: {}
            };
        }
        
        const GITHUB_CONFIG = window.GITHUB_CONFIG;
        
        // Validate configuration
        if (!GITHUB_CONFIG || !GITHUB_CONFIG.token || !GITHUB_CONFIG.gistId) {
            const configError = new Error('GitHub configuration incomplete');
            configError.name = 'ConfigurationError';
            configError.details = {
                hasToken: !!GITHUB_CONFIG?.token,
                hasGistId: !!GITHUB_CONFIG?.gistId,
                tokenLength: GITHUB_CONFIG?.token?.length || 0,
                gistId: GITHUB_CONFIG?.gistId || 'missing',
                username: GITHUB_CONFIG?.username || 'missing'
            };
            window.appLogger.error('StorageAPI', 'GitHub token not configured - data will not be saved', {
                error: configError.message,
                details: configError.details
            });
            throw configError;
        }
        
        // Validate token format
        if (!GITHUB_CONFIG.token.startsWith('ghp_') && !GITHUB_CONFIG.token.startsWith('github_pat_')) {
            window.appLogger.warn('StorageAPI', 'Token format may be incorrect', {
                tokenPrefix: GITHUB_CONFIG.token.substring(0, 10) + '...',
                expectedPrefix: 'ghp_ or github_pat_'
            });
        }
        
        try {
            const payload = {
                files: {
                    'portfolio-data.json': {
                        content: JSON.stringify(data, null, 2)
                    }
                }
            };
            
            const payloadSize = JSON.stringify(payload).length;
            window.appLogger.debug('StorageAPI', 'Preparing save request', {
                payloadSize: payloadSize,
                gistId: GITHUB_CONFIG.gistId,
                username: GITHUB_CONFIG.username,
                apiEndpoint: `https://api.github.com/gists/${GITHUB_CONFIG.gistId}`
            });
            
            const startTime = performance.now();
            window.appLogger.debug('StorageAPI', 'Sending fetch request to GitHub API');
            
            const response = await fetch(`https://api.github.com/gists/${GITHUB_CONFIG.gistId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `token ${GITHUB_CONFIG.token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.github.v3+json',
                    'X-GitHub-Api-Version': '2022-11-28'
                },
                body: JSON.stringify(payload)
            });
            const saveTime = performance.now() - startTime;
            
            window.appLogger.debug('StorageAPI', 'Save response received', {
                status: response.status,
                statusText: response.statusText,
                statusOk: response.ok,
                duration: `${saveTime.toFixed(2)}ms`,
                headers: {
                    contentType: response.headers.get('content-type'),
                    rateLimitRemaining: response.headers.get('x-ratelimit-remaining'),
                    rateLimitReset: response.headers.get('x-ratelimit-reset')
                }
            });
            
            if (!response.ok) {
                let errorData = {};
                let errorText = '';
                try {
                    errorData = await response.json();
                    errorText = JSON.stringify(errorData);
                } catch (parseError) {
                    errorText = await response.text().catch(() => 'Unable to read error response');
                    window.appLogger.warn('StorageAPI', 'Failed to parse error response as JSON', {
                        parseError: parseError.message,
                        errorText: errorText.substring(0, 200)
                    });
                }
                
                const apiError = new Error(`GitHub API error: ${response.status} ${response.statusText}`);
                apiError.name = 'GitHubAPIError';
                apiError.status = response.status;
                apiError.statusText = response.statusText;
                apiError.details = {
                    gistId: GITHUB_CONFIG.gistId,
                    username: GITHUB_CONFIG.username,
                    errorData: errorData,
                    errorText: errorText,
                    rateLimitRemaining: response.headers.get('x-ratelimit-remaining'),
                    rateLimitReset: response.headers.get('x-ratelimit-reset')
                };
                
                window.appLogger.error('StorageAPI', 'Save request failed', {
                    error: apiError.message,
                    status: apiError.status,
                    statusText: apiError.statusText,
                    details: apiError.details
                });
                
                // Provide specific guidance based on status code
                if (response.status === 401) {
                    apiError.userMessage = 'Authentication failed. Please verify your token is valid and has the "gist" scope.';
                    window.appLogger.warn('StorageAPI', 'Authentication error - check token validity and permissions', {
                        tokenPrefix: GITHUB_CONFIG.token.substring(0, 10) + '...',
                        requiredScope: 'gist'
                    });
                } else if (response.status === 403) {
                    apiError.userMessage = 'Access forbidden. Token may lack permissions or Gist may not exist.';
                    window.appLogger.warn('StorageAPI', 'Forbidden - check token permissions and Gist existence');
                } else if (response.status === 404) {
                    apiError.userMessage = 'Gist not found. Please verify the Gist ID is correct.';
                    window.appLogger.warn('StorageAPI', 'Gist not found', { gistId: GITHUB_CONFIG.gistId });
                } else if (response.status === 422) {
                    apiError.userMessage = 'Invalid request. Check that the Gist file is named "portfolio-data.json".';
                    window.appLogger.warn('StorageAPI', 'Validation error - check Gist file name and structure');
                }
                
                throw apiError;
            }
            
            // Parse successful response
            let responseData = {};
            try {
                responseData = await response.json();
                window.appLogger.debug('StorageAPI', 'Save response parsed', {
                    gistId: responseData.id,
                    fileCount: Object.keys(responseData.files || {}).length,
                    hasPortfolioData: !!responseData.files?.['portfolio-data.json']
                });
            } catch (parseError) {
                window.appLogger.warn('StorageAPI', 'Failed to parse success response', { error: parseError.message });
            }
            
            window.appLogger.info('StorageAPI', 'Data saved successfully', { 
                duration: `${saveTime.toFixed(2)}ms`,
                gistId: responseData.id || GITHUB_CONFIG.gistId,
                fileUpdated: 'portfolio-data.json'
            });
            window.appLogger.traceEnd('StorageAPI', 'save', { success: true });
            return true;
        } catch (error) {
            // Preserve error details
            const errorDetails = {
                name: error.name || 'Error',
                message: error.message || 'Unknown error',
                stack: error.stack,
                status: error.status,
                statusText: error.statusText,
                details: error.details,
                userMessage: error.userMessage
            };
            
            window.appLogger.error('StorageAPI', 'Error saving data', {
                error: errorDetails.message,
                name: errorDetails.name,
                status: errorDetails.status,
                details: errorDetails.details,
                stack: errorDetails.stack?.split('\n').slice(0, 3).join('\n') // First 3 lines of stack
            });
            
            if (error.status === 401 || error.status === 403) {
                window.appLogger.warn('StorageAPI', 'Authentication/Authorization failed', {
                    message: errorDetails.userMessage || 'Please verify your token is valid and has the "gist" scope.',
                    error: errorDetails.message
                });
            }
            
            window.appLogger.traceEnd('StorageAPI', 'save', { 
                success: false,
                error: errorDetails.message,
                errorName: errorDetails.name
            });
            
            // Re-throw with full context
            throw error;
        }
    }
};

