import { Html, Head, Main, NextScript } from 'next/document'

export default function Document(props) {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap" rel="stylesheet" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}