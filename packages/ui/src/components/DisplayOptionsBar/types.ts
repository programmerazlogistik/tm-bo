export interface StatusOption {
  value: string | null;
  label: string;
  count?: number;
  hasNotification?: boolean;
}

export interface DisplayOptionsBarProps {
  totalCount?: number;
  statusOptions?: StatusOption[];
  currentStatus?: string | null;
  onStatusChange?: (status: string | null) => void;
  className?: string;
  showAllOption?: boolean;
}
