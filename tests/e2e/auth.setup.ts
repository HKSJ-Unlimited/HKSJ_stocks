import { test as setup } from '@playwright/test';
import cookiesFile from './auth/cookies.json' with { type: 'json' };

setup('authenticate with cookies', async ({ browser }) => {
    const context = await browser.newContext();

    try {
        const formattedCookies = cookiesFile.map(cookie => ({
            name: cookie.name,
            value: cookie.value,
            domain: cookie.domain,
            path: cookie.path,
            httpOnly: cookie.httpOnly,
            secure: cookie.secure,
            sameSite: cookie.sameSite === 'lax' ? 'Lax' as const :
                cookie.sameSite === 'strict' ? 'Strict' as const :
                    cookie.sameSite === 'none' ? 'None' as const : undefined,
            expires: cookie.expirationDate ?? undefined
        }));
        await context.addCookies(formattedCookies);
        console.log('Cookies loaded successfully!', formattedCookies);
    } catch (error) {
        console.error('Error loading cookies:', error);
    }
    await context.storageState({ path: 'tests/e2e/auth/user.json' })

});