import { dashboard, transactions, trend, expenses} from '../utils/icons'

export const menuItems = [
    {
        id: 1,
        title: 'Tablero',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "Ver Transacciones",
        icon: transactions,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Ingresos",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Egresos",
        icon: expenses,
        link: "/dashboard",
    },
]