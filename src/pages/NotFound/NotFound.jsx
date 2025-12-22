import { Link } from "react-router";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-7xl font-bold text-primary">404</h1>
            <p className="text-xl mt-4 mb-6">Page not found</p>

            <Link to="/" className="btn btn-primary">
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
