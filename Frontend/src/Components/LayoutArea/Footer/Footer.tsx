import "./Footer.css";

function Footer(): JSX.Element {
    const currentYear = new Date().getFullYear();

    return (
        <div className="Footer">
            <span>&copy; {currentYear} Winter Vacation. All rights reserved.</span>
        </div>
    );
}

export default Footer;
