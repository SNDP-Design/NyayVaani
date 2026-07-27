import React from 'react';

interface AppErrorBoundaryState {
  hasError: boolean;
}

interface AppErrorBoundaryProps {
  children?: React.ReactNode;
}

export class AppErrorBoundary extends React.Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  declare readonly props: Readonly<AppErrorBoundaryProps>;
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('NyayVaani interface error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen grid place-items-center bg-slate-50 px-6 font-sans">
          <section className="w-full max-w-lg rounded-3xl border border-slate-300 bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-extrabold text-slate-950">
              NyayVaani needs to reload
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The interface could not finish loading. Your uploaded document was
              not sent again.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-xl bg-black px-5 py-3 text-sm font-bold text-white"
            >
              Reload NyayVaani
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
