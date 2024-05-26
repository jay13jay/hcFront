import { Stack } from "react-bootstrap";

function Footer() {
    return (
        <footer className="text-center">
            <Stack className="justify-content-center" direction="horizontal">
                <p>⌧</p>
                <p className="logo">Hax</p>
                <p className="logo2">Chat</p>
                <p className="copyright">© 2024</p>
            </Stack>
        </footer>

    )
}

export default Footer;