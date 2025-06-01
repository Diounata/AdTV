import { Typography } from "../typography";

interface Props {
  length: number;
  singularText: string;
  pluralText: string;
}

export function PageContentLength({ length, singularText, pluralText }: Props) {
  return (
    <Typography variant="mutedText">
      {length} {length === 1 ? singularText : pluralText}
    </Typography>
  );
}
