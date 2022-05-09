import dynamic from 'next/dynamic';

const CodeBlock = dynamic(() => import('../components/CodeBlock'));

const SAMPLE_CODE = `
() => {
  const [count, setCount] = useState(0);
  return (
    <Stack align="center" bg="gray.100" spacing="4" p="4">
      <Heading>Times Booped: {count}</Heading>
      <Stack direction="horizontal" spacing="2" isInline>
        <Button colorScheme="pink" onClick={() => setCount(count + 1)}>
          Boop!
        </Button>
        <Button colorScheme="pink" variant="outline" onClick={() => setCount(0)}>
          Reset
        </Button>
      </Stack>
    </Stack>
  );
}
`;

export default function Home() {
  return (
    <div className="flex items-center justify-center max-w-2xl min-h-screen mx-auto">
      <CodeBlock code={SAMPLE_CODE} />
    </div>
  );
}
