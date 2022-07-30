import { SVGProps } from "react"

// https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=880&amp;q=80
const SvgBlobImage = ({href, ...rest}: SVGProps<SVGSVGElement> & { href: string } ) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 500 500"
    style={{
      opacity: 1,
    }}
    {...rest}
  >
    <image
      width="100%"
      height="100%"
      clipPath="url(#a)"
      href={href}
      preserveAspectRatio="none"
    />
    <defs>
      <linearGradient id="b" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop
          offset="0%"
          style={{
            stopColor: "#eecda3",
          }}
        />
        <stop
          offset="100%"
          style={{
            stopColor: "#ef629f",
          }}
        />
      </linearGradient>
    </defs>
    <clipPath id="a" />
  </svg>
)

export default SvgBlobImage
