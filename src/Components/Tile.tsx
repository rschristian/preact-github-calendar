import { ComponentChild, FunctionalComponent, h } from 'preact';

interface IProps {
    content: ComponentChild;
}

export const Tile: FunctionalComponent<IProps> = (props: IProps) => {
    return <div class="tile is-child box content-section">{props.content}</div>;
};
