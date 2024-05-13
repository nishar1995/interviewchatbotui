import { metaObject } from '@/config/site.config';
import IntegrationSettingsView from '@/app/shared/account-settings/integration-settings';

export const metadata = {
  ...metaObject('Integration'),
};

export default function IntegrationSettingsFormPage() {
  return <IntegrationSettingsView />;
}
