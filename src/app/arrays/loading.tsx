import { CardViewer } from '@/widgets/CardViewer/ui/CardViewer';

export default function Loading() {
    return <CardViewer items={[]} isLoading={true} progressKey="arrays" />;
} 