import Tabs from '@cloudscape-design/components/tabs';

export function OrderId() {
  return (
    <Tabs
      tabs={[
        {
          label: 'Overview',
          id: 'first',
          content: 'Landing Page content',
        },
        {
          label: 'JSON Response',
          id: 'second',
          content: 'JSON Response',
        },
      ]}
      variant="container"
    />
  );
}
