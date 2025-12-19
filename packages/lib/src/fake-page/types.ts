/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface FakePageProps {
  className?: string;
  step: string;
  children: React.ReactNode;
  hideMainContent?: boolean;
  containerId?: string;
  mainContentId?: string;
}

export interface FakePageHookReturn {
  currentStep: string | null;
  next: (step: string) => void;
  back: () => void;
  close: () => void;
  isOpen: boolean;
}
