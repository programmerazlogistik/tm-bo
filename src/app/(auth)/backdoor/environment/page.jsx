export default function Page() {
  const envVars = Object.entries(process.env)
    .filter(([key]) => key.startsWith("NEXT_PUBLIC_"))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return <pre>{JSON.stringify(envVars, null, 2)}</pre>;
}
