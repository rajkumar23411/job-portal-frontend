import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link to="/" className="h3-medium">
            <span className="text-primary-600">Job</span>
            <span>Shala</span>
        </Link>
    );
};

export default Logo;
