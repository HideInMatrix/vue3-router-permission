export const publicRoutes = [
        {
        path:"/unauthorized",
        name:'unauthorized',
        meta:{
            title:'unauthorized'
        },
        component:()=>import('../views/unauthorized.vue')
    }
]