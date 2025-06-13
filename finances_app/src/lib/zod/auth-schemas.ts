import { z } from "zod"

export const authSchemas = (t: (...args: Parameters<(key: string, ...params: any[]) => string>) => string) => ({
    signIn: z.object({
        email: z.string().email(t('app.auth.login.page.error.email')),
        password: z.string().min(6, t('app.auth.login.page.error.password')),
    }),

    signUp: z.object({
        email: z.string().email(t('app.auth.register.page.error.email')),
        password: z.string().min(6, t('app.auth.register.page.error.password')),
        passwordConfirmation: z.string(),
        name: z.string(),
        image: z.string(),
    })
    .refine(data => data.password === data.passwordConfirmation, {
        message: t('app.auth.register.page.error.passwordMatch'),
        path: ["passwordConfirmation"],
    }),

    forgotPassword: z.object({
        email: z.string().email(t('app.auth.forgetPassword.page.error.email')),
    }),

    resetPassword: z.object({
        password: z.string().min(6, t('components.utils.managePassword.error.password')),
        passwordConfirmation: z.string(),
    })
    .refine(data => data.password === data.passwordConfirmation, {
        message: t('components.utils.managePassword.error.passwordMatch'),
        path: ["passwordConfirmation"],
    }),

    changePasswordSession : z.object({
        password: z.string().min(6, t('components.utils.managePassword.error.password')),
        passwordConfirmation: z.string(),
        currentPassword: z.string(),
    }).refine(data => data.password === data.passwordConfirmation, {
        message: t('components.utils.managePassword.error.passwordMatch'),
        path: ["passwordConfirmation"],
    }),

    updateUser: z.object({
        email: z.string().email(t('app.dashboard.settings.components.account.error.email')),
        name: z.string(),
        image: z.string(),
    }),
})