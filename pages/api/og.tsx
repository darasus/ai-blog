import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

const gray = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#eeeeee',
  300: '#e0e0e0',
  400: '#bdbdbd',
  500: '#9e9e9e',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
  1000: '#0a0a0a',
}

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = searchParams.get('title') as string
  const category = searchParams.get('category') as string
  const imageSrc = searchParams.get('imageSrc') as string

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          background: '#fafafa',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          color: gray[800],
          border: '10px solid #6d28d9',
          fontFamily: 'SF Pro',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', width: 600, flexDirection: 'column' }}>
            <span
              style={{
                fontWeight: 800,
                fontSize: 20,
                lineHeight: 1,
                color: gray[700],
                paddingRight: 6,
                paddingLeft: 6,
                paddingTop: 4,
                paddingBottom: 4,
                textTransform: 'uppercase',
                backgroundColor: gray[200],
              }}
            >{`${category}`}</span>
            <span
              style={{
                fontWeight: 800,
                fontSize: 60,
                lineHeight: 1,
                color: gray[800],
                paddingRight: 20,
                marginBottom: 5,
              }}
            >{`${title}`}</span>
            <div
              style={{
                display: 'flex',
              }}
            >
              <svg
                width="200"
                height="40"
                viewBox="0 0 300 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.82955 18.6257V13.5455H28.5213V18.6257H18.1811V47H12.1697V18.6257H1.82955ZM39.3189 32.2983V47H33.4055V13.5455H39.1882V26.1726H39.4822C40.0703 24.7569 40.9796 23.6406 42.2102 22.8239C43.4517 21.9962 45.0308 21.5824 46.9474 21.5824C48.6899 21.5824 50.209 21.9472 51.505 22.6768C52.8009 23.4065 53.8028 24.4737 54.5107 25.8786C55.2294 27.2834 55.5888 28.9986 55.5888 31.0241V47H49.6754V31.9389C49.6754 30.2509 49.2398 28.9387 48.3686 28.0021C47.5083 27.0547 46.2995 26.581 44.7422 26.581C43.6967 26.581 42.7602 26.8097 41.9325 27.267C41.1158 27.7135 40.4732 28.3615 40.005 29.2109C39.5476 30.0604 39.3189 31.0895 39.3189 32.2983ZM72.7244 47.4901C70.2088 47.4901 68.0362 46.9673 66.2067 45.9219C64.388 44.8655 62.9886 43.3736 62.0085 41.446C61.0284 39.5076 60.5384 37.2261 60.5384 34.6016C60.5384 32.0206 61.0284 29.7554 62.0085 27.8061C62.9995 25.8459 64.3826 24.3213 66.1577 23.2322C67.9328 22.1323 70.0182 21.5824 72.4141 21.5824C73.9605 21.5824 75.4197 21.8329 76.7919 22.3338C78.175 22.8239 79.3947 23.5862 80.451 24.6207C81.5182 25.6553 82.3568 26.973 82.9666 28.5739C83.5765 30.1638 83.8814 32.0587 83.8814 34.2585V36.0717H63.3153V32.0859H78.2131C78.2022 30.9534 77.9572 29.946 77.478 29.0639C76.9988 28.1709 76.3291 27.4685 75.4688 26.9567C74.6193 26.4448 73.6283 26.1889 72.4957 26.1889C71.2869 26.1889 70.2251 26.483 69.3104 27.071C68.3956 27.6482 67.6823 28.4105 67.1705 29.358C66.6695 30.2945 66.4136 31.3236 66.4027 32.4453V35.9247C66.4027 37.384 66.6695 38.6364 67.2031 39.6818C67.7367 40.7164 68.4827 41.5114 69.4411 42.0668C70.3994 42.6113 71.5211 42.8835 72.8061 42.8835C73.6664 42.8835 74.4451 42.7637 75.142 42.5241C75.839 42.2737 76.4434 41.9089 76.9553 41.4297C77.4671 40.9505 77.8537 40.357 78.1151 39.6491L83.6364 40.2699C83.2879 41.7292 82.6236 43.0033 81.6435 44.0923C80.6742 45.1705 79.4328 46.009 77.919 46.608C76.4053 47.196 74.6738 47.4901 72.7244 47.4901Z"
                  fill={gray[800]}
                />
                <path
                  d="M173.3 47V13.5455H185.845C188.415 13.5455 190.571 14.0246 192.314 14.983C194.067 15.9413 195.39 17.259 196.283 18.9361C197.187 20.6023 197.639 22.4972 197.639 24.6207C197.639 26.7661 197.187 28.6719 196.283 30.3381C195.379 32.0043 194.045 33.3165 192.281 34.2749C190.517 35.2223 188.344 35.696 185.763 35.696H177.449V30.7138H184.947C186.45 30.7138 187.68 30.4524 188.638 29.9297C189.597 29.407 190.305 28.6882 190.762 27.7734C191.23 26.8587 191.464 25.8078 191.464 24.6207C191.464 23.4337 191.23 22.3883 190.762 21.4844C190.305 20.5805 189.591 19.8781 188.622 19.3771C187.664 18.8653 186.428 18.6094 184.914 18.6094H179.36V47H173.3ZM209.413 47.5064C207.823 47.5064 206.391 47.2232 205.117 46.657C203.853 46.0798 202.852 45.2304 202.111 44.1087C201.381 42.987 201.017 41.6039 201.017 39.9595C201.017 38.5438 201.278 37.3731 201.801 36.4474C202.323 35.5218 203.037 34.7812 203.941 34.2259C204.844 33.6705 205.863 33.2512 206.995 32.968C208.139 32.674 209.32 32.4616 210.54 32.331C212.01 32.1785 213.203 32.0424 214.117 31.9226C215.032 31.7919 215.696 31.5959 216.11 31.3345C216.535 31.0623 216.747 30.643 216.747 30.0767V29.9787C216.747 28.7481 216.383 27.7952 215.653 27.12C214.923 26.4448 213.872 26.1072 212.5 26.1072C211.052 26.1072 209.903 26.4231 209.053 27.0547C208.215 27.6863 207.649 28.4323 207.355 29.2926L201.833 28.5085C202.269 26.9839 202.988 25.7098 203.99 24.6861C204.991 23.6515 206.217 22.8783 207.665 22.3665C209.113 21.8438 210.714 21.5824 212.468 21.5824C213.676 21.5824 214.88 21.724 216.078 22.0071C217.276 22.2902 218.37 22.7585 219.361 23.4119C220.352 24.0544 221.147 24.9311 221.746 26.0419C222.356 27.1527 222.661 28.5412 222.661 30.2074V47H216.976V43.5533H216.78C216.421 44.2502 215.914 44.9036 215.261 45.5135C214.618 46.1125 213.807 46.5971 212.827 46.9673C211.858 47.3267 210.72 47.5064 209.413 47.5064ZM210.948 43.1612C212.135 43.1612 213.164 42.9271 214.036 42.4588C214.907 41.9796 215.577 41.348 216.045 40.5639C216.524 39.7798 216.764 38.925 216.764 37.9993V35.0426C216.579 35.1951 216.263 35.3366 215.816 35.4673C215.381 35.598 214.891 35.7124 214.346 35.8104C213.802 35.9084 213.262 35.9955 212.729 36.0717C212.195 36.148 211.732 36.2133 211.34 36.2678C210.458 36.3875 209.669 36.5836 208.972 36.8558C208.275 37.1281 207.725 37.5092 207.322 37.9993C206.919 38.4785 206.718 39.0992 206.718 39.8615C206.718 40.9505 207.115 41.7727 207.91 42.3281C208.705 42.8835 209.718 43.1612 210.948 43.1612ZM228.607 56.4091V21.9091H234.422V26.0582H234.765C235.07 25.4484 235.5 24.8004 236.056 24.1143C236.611 23.4174 237.362 22.8239 238.31 22.3338C239.257 21.8329 240.466 21.5824 241.936 21.5824C243.875 21.5824 245.623 22.0779 247.18 23.0689C248.748 24.049 249.99 25.5028 250.904 27.4304C251.83 29.3471 252.293 31.6993 252.293 34.4872C252.293 37.2424 251.841 39.5838 250.937 41.5114C250.033 43.4389 248.802 44.9091 247.245 45.9219C245.688 46.9347 243.924 47.4411 241.953 47.4411C240.515 47.4411 239.323 47.2015 238.375 46.7223C237.428 46.2431 236.665 45.666 236.088 44.9908C235.522 44.3047 235.081 43.6567 234.765 43.0469H234.52V56.4091H228.607ZM234.406 34.4545C234.406 36.0772 234.634 37.4983 235.092 38.718C235.56 39.9377 236.23 40.8906 237.101 41.5767C237.983 42.2519 239.05 42.5895 240.303 42.5895C241.61 42.5895 242.704 42.241 243.586 41.544C244.468 40.8362 245.133 39.8724 245.579 38.6527C246.036 37.4221 246.265 36.0227 246.265 34.4545C246.265 32.8973 246.042 31.5142 245.595 30.3054C245.149 29.0966 244.485 28.1491 243.602 27.4631C242.72 26.777 241.62 26.4339 240.303 26.4339C239.039 26.4339 237.967 26.7661 237.085 27.4304C236.203 28.0947 235.533 29.0258 235.075 30.2237C234.629 31.4216 234.406 32.8319 234.406 34.4545ZM268.465 47.4901C265.949 47.4901 263.776 46.9673 261.947 45.9219C260.128 44.8655 258.729 43.3736 257.749 41.446C256.769 39.5076 256.279 37.2261 256.279 34.6016C256.279 32.0206 256.769 29.7554 257.749 27.8061C258.74 25.8459 260.123 24.3213 261.898 23.2322C263.673 22.1323 265.758 21.5824 268.154 21.5824C269.701 21.5824 271.16 21.8329 272.532 22.3338C273.915 22.8239 275.135 23.5862 276.191 24.6207C277.258 25.6553 278.097 26.973 278.707 28.5739C279.317 30.1638 279.622 32.0587 279.622 34.2585V36.0717H259.056V32.0859H273.953C273.942 30.9534 273.697 29.946 273.218 29.0639C272.739 28.1709 272.069 27.4685 271.209 26.9567C270.36 26.4448 269.369 26.1889 268.236 26.1889C267.027 26.1889 265.965 26.483 265.051 27.071C264.136 27.6482 263.423 28.4105 262.911 29.358C262.41 30.2945 262.154 31.3236 262.143 32.4453V35.9247C262.143 37.384 262.41 38.6364 262.943 39.6818C263.477 40.7164 264.223 41.5114 265.181 42.0668C266.14 42.6113 267.261 42.8835 268.546 42.8835C269.407 42.8835 270.185 42.7637 270.882 42.5241C271.579 42.2737 272.184 41.9089 272.695 41.4297C273.207 40.9505 273.594 40.357 273.855 39.6491L279.377 40.2699C279.028 41.7292 278.364 43.0033 277.384 44.0923C276.414 45.1705 275.173 46.009 273.659 46.608C272.146 47.196 270.414 47.4901 268.465 47.4901ZM284.624 47V21.9091H290.358V26.0909H290.619C291.077 24.6425 291.861 23.5263 292.972 22.7422C294.093 21.9472 295.373 21.5497 296.81 21.5497C297.137 21.5497 297.502 21.566 297.905 21.5987C298.319 21.6205 298.662 21.6586 298.934 21.7131V27.1527C298.683 27.0656 298.286 26.9893 297.741 26.924C297.208 26.8478 296.691 26.8097 296.19 26.8097C295.112 26.8097 294.142 27.0438 293.282 27.5121C292.433 27.9695 291.763 28.6065 291.273 29.4233C290.783 30.2401 290.538 31.1821 290.538 32.2493V47H284.624Z"
                  fill={gray[800]}
                />
                <rect x="98" width="60" height="60" rx="15" fill={gray[800]} />
                <path
                  d="M119.259 47.5064C117.669 47.5064 116.237 47.2232 114.962 46.657C113.699 46.0798 112.697 45.2304 111.957 44.1087C111.227 42.987 110.862 41.6039 110.862 39.9595C110.862 38.5438 111.124 37.3731 111.646 36.4474C112.169 35.5218 112.882 34.7812 113.786 34.2259C114.69 33.6705 115.708 33.2512 116.841 32.968C117.984 32.674 119.166 32.4616 120.386 32.331C121.856 32.1785 123.048 32.0424 123.963 31.9226C124.878 31.7919 125.542 31.5959 125.956 31.3345C126.381 31.0623 126.593 30.643 126.593 30.0767V29.9787C126.593 28.7481 126.228 27.7952 125.499 27.12C124.769 26.4448 123.718 26.1072 122.346 26.1072C120.897 26.1072 119.749 26.4231 118.899 27.0547C118.061 27.6863 117.494 28.4323 117.2 29.2926L111.679 28.5085C112.115 26.9839 112.833 25.7098 113.835 24.6861C114.837 23.6515 116.062 22.8783 117.511 22.3665C118.959 21.8438 120.56 21.5824 122.313 21.5824C123.522 21.5824 124.725 21.724 125.923 22.0071C127.121 22.2902 128.216 22.7585 129.207 23.4119C130.198 24.0544 130.993 24.9311 131.592 26.0419C132.201 27.1527 132.506 28.5412 132.506 30.2074V47H126.822V43.5533H126.626C126.266 44.2502 125.76 44.9036 125.107 45.5135C124.464 46.1125 123.653 46.5971 122.673 46.9673C121.703 47.3267 120.565 47.5064 119.259 47.5064ZM120.794 43.1612C121.981 43.1612 123.01 42.9271 123.881 42.4588C124.753 41.9796 125.422 41.348 125.891 40.5639C126.37 39.7798 126.609 38.925 126.609 37.9993V35.0426C126.424 35.1951 126.108 35.3366 125.662 35.4673C125.226 35.598 124.736 35.7124 124.192 35.8104C123.647 35.9084 123.108 35.9955 122.575 36.0717C122.041 36.148 121.578 36.2133 121.186 36.2678C120.304 36.3875 119.514 36.5836 118.817 36.8558C118.121 37.1281 117.571 37.5092 117.168 37.9993C116.765 38.4785 116.563 39.0992 116.563 39.8615C116.563 40.9505 116.961 41.7727 117.756 42.3281C118.551 42.8835 119.563 43.1612 120.794 43.1612ZM138.452 47V21.9091H144.366V47H138.452ZM141.425 18.348C140.489 18.348 139.683 18.0376 139.008 17.4169C138.333 16.7853 137.995 16.0284 137.995 15.1463C137.995 14.2533 138.333 13.4964 139.008 12.8757C139.683 12.2441 140.489 11.9283 141.425 11.9283C142.373 11.9283 143.179 12.2441 143.843 12.8757C144.518 13.4964 144.856 14.2533 144.856 15.1463C144.856 16.0284 144.518 16.7853 143.843 17.4169C143.179 18.0376 142.373 18.348 141.425 18.348Z"
                  fill={gray[100]}
                />
              </svg>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              borderWidth: 10,
              borderColor: '#fff',
              boxShadow: `0px 0px 10px 10px ${gray[200]}`,
              justifyContent: 'center',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageSrc} alt="" height={400} width={400} />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      emoji: 'twemoji',
    }
  )
}
