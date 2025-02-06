type ErrorPageProps = {
  errorCode: number;
  message?: string;
};

const ErrorPage: React.FC<ErrorPageProps> = ({ errorCode, message }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh] text-gray-900 text-center">
      <h1 className="font-roboto-bold text-9xl">{errorCode}</h1>
      <h1 className="font-bold">Oops...!</h1>
      <h4 className="text-md">
        {message || "The page you requested cannot be found."}
      </h4>
    </div>
  );
};

export default ErrorPage;
