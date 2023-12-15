import { Example } from "./Example";

import styles from "./Example.module.css";

export type ExampleModel = {
    text: string;
    value: string;
};

const EXAMPLES: ExampleModel[] = [
    {
        text: "Describe me the Advanced-control timer",
        value: "Describe me the Advanced-control timer"
    },
    {
        text: "What can you tell me about the flash memory characteristics?",
        value: "What can you tell me about the flash memory characteristics?"
    },
    {
        text: "What is the size of the TSSOP20 package?",
        value: "What is the size of the TSSOP20 package?"
    }
];

interface Props {
    onExampleClicked: (value: string) => void;
}

export const ExampleList = ({ onExampleClicked }: Props) => {
    return (
        <ul className={styles.examplesNavList}>
            {EXAMPLES.map((x, i) => (
                <li key={i}>
                    <Example text={x.text} value={x.value} onClick={onExampleClicked} />
                </li>
            ))}
        </ul>
    );
};
