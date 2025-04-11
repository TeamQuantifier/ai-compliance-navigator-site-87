
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Shield, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Check if the path is related to frameworks
  const isFramework = location.pathname.includes("/frameworks");
  const isInfoSecurity = location.pathname.includes("/frameworks/information-security");
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold text-red-500">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-6">
          The page you are looking for doesn't exist or may have been moved.
        </p>
        
        <div className="flex flex-col space-y-3">
          <Button asChild variant="default" className="w-full">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          
          {isInfoSecurity && (
            <Button asChild variant="outline" className="w-full">
              <Link to="/frameworks/information-security">
                <Shield className="mr-2 h-4 w-4" />
                Back to Information Security
              </Link>
            </Button>
          )}
          
          {isFramework && !isInfoSecurity && (
            <Button asChild variant="outline" className="w-full">
              <Link to="/frameworks">
                <Shield className="mr-2 h-4 w-4" />
                Back to Frameworks
              </Link>
            </Button>
          )}
          
          <Button asChild variant="ghost" className="w-full">
            <Link to="#" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
