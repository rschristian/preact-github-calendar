import { ComponentChild, Fragment, FunctionalComponent, h } from 'preact';

import { Tile } from './Tile';

interface IProps {
    label: string;
    usage: string;
    calendar: ComponentChild;
}

export const UsageOption: FunctionalComponent<IProps> = (props: IProps) => {
    return (
        <div class="mb-6 mx-3">
            <h5 class="title is-size-5 has-text-weight-normal mb-4">• {props.label}</h5>
            <pre class="mt-4">
                <code>{props.usage}</code>
            </pre>
            <Tile content={<Fragment>{props.calendar}</Fragment>} />
        </div>
    );
};
