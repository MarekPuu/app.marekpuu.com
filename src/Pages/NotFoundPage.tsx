import { Link } from 'react-router-dom';
import SuspenseWithLoader from '../components/Suspense/Suspense';

const NotFoundPage = () => {
  return (
    <SuspenseWithLoader>
      <div className="not_found_page">
        <div className="error_404">
          <h1>404</h1>
        </div>
        <h2>Sivua ei löytynyt</h2>
        <Link replace to={'/'}>
          Takaisin etusivulle
        </Link>
      </div>
    </SuspenseWithLoader>
  );
};

export default NotFoundPage;
