type Props = {
  navigation: string
  text: string
  src: string
  altText: string
}

export function DashboardItem({text, src, altText}: Props) {
  return (
    <>
      <div>
        <button>
          <img alt={altText} src={src}/>
        </button>
        <div>
          {text}
        </div>
      </div>
    </>
  )
}