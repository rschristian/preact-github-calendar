import { ComponentChild } from 'preact';

import { CodeBlock } from './CodeBlock';
import { Tile } from './Tile';

interface IProps {
    label: string;
    usage: string;
    calendar: ComponentChild;
}

export function UsageOption(props: IProps) {
    return (
        <div class="mb-6 mx-3">
            <h5 class="text(xl green) mb-4">• {props.label}</h5>
            <CodeBlock content={props.usage} />
            <Tile content={props.calendar} />
        </div>
    );
}
