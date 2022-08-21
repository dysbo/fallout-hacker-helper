export interface TextProps {
  text: string
}

const Text = (props: TextProps) => (
  <>
    <div className="text">{props.text}</div>
  </>
)

export default Text
