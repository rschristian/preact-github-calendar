import { ComponentChild } from 'preact';

export function Tile(props: { content: ComponentChild }) {
    return <div class="mt-2 p-5 bg-white rounded shadow-lg">{props.content}</div>;
}
