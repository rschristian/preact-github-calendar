interface Props {
    content: string;
}

export function CodeBlock(props: Props) {
    return (
        <pre class="p-3 bg-code-block border(1 solid code-border) overflow-x-auto">
            <code>{props.content}</code>
        </pre>
    );
}
