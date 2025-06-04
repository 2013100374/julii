import { ImageResponse } from 'next/og'
 
// Image metadata
export const size = {
  width: 720,
  height: 720,
}
export const contentType = 'image/png'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 70,
          background: `url("${process.env.NEXT_PUBLIC_API_URL}/assets/images/logo_icon/favicon.png")`,
          background_size: 'contain',
          background_repeat: 'no-repeat',
          background_position: 'center',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}