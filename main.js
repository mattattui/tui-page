import './style.css'

// Load and globally register the custom elements
import TuiPage from './src/tui-page';
import PageTitle from './src/components/page-title';
import PageText from './src/components/page-text';
import PageRow from './src/components/page-row';

customElements.define('tui-page', TuiPage);
customElements.define('page-title', PageTitle);
customElements.define('page-text', PageText);
customElements.define('page-row', PageRow);
