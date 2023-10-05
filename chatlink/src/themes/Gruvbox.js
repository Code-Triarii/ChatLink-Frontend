import { createTheme } from '@mui/material/styles';

export const Gruvbox = createTheme({
    typography: {
        fontFamily: '"Fira Code", monospace',
    },
    palette: {
        primary: {
            main: '#fb4934', // red
        },
        secondary: {
            main: '#83a598', // green
        },
        error: {
            main: '#fb4934', // red
        },
        warning: {
            main: '#fe8019', // orange
        },
        info: {
            main: '#83a598', // green
        },
        success: {
            main: '#b8bb26', // yellow
        },
        background: {
            default: '#282828', // dark grey
            paper: '#3c3836', // lighter grey
        },
        text: {
            primary: '#ebdbb2', // beige
            secondary: '#d5c4a1', // dark beige
        },
    },
    scrollBar: {
        main: '#d5c4a1',
        width: '8px',
    },
    table: {
        headerBackground: '#504945',
    },
    random: [
        '#a54242',
        '#de935f',
        '#5f819d',
        '#8c9440',
        '#85678f',
        '#5e8d87',
        '#6c7a80',
        '#aa8841'
    ]
},
);
