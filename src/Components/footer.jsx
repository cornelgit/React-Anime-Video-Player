import "./footer.css";

function Footer() {
    return (
        <footer className="footer-container">
            <p>
                &copy; {new Date().getFullYear()} Cornel Stoica. Personal
                Project.
            </p>
            <p className="footer-right">
                Contents owned by Konami; site is educational only and does not
                claim ownership.
            </p>
        </footer>
    );
}

export default Footer;
