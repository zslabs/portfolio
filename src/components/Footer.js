import PropTypes from 'prop-types'
import { useTheme } from 'emotion-theming'
import clsx from 'clsx'
import { rgba } from 'polished'
import { link } from 'chaoskit/src/assets/styles/utility'

import { TextLink } from './mdxShortcodes'
import Icon from './Icon'

import pattern from '~media/pattern.png'

const FooterLink = (props) => {
  const theme = useTheme()

  return (
    <TextLink
      css={[
        link.reset(theme),
        {
          backgroundImage: `linear-gradient(${rgba(
            theme.fontColor.heading,
            0.075
          )}, ${rgba(theme.fontColor.heading, 0.075)})`,
          backgroundPosition: '0% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '0% 4px',
          transition: `background-size ${theme.timing.long} ${theme.transition.base}`,
          fontWeight: theme.fontWeight.bold,

          '&:hover, &:focus, &.is-active': {
            backgroundSize: '100% 4px',
          },
        },
      ]}
      {...props}
    />
  )
}

const Footer = ({ className, runAnimation, ...rest }) => {
  const theme = useTheme()

  return (
    <footer
      css={[
        runAnimation && {
          // GSAP
          opacity: 0,
          transform: 'translateY(25%)',
        },

        {
          position: 'relative',
          paddingTop: theme.space.large + theme.space.base,
          paddingBottom: theme.space.base,
          textAlign: 'center',
          fontSize: theme.fontSize.small,
          color: theme.fontColor.muted,

          '&::before, &::after': {
            content: "''",
            position: 'absolute',
            background: `url(${pattern}) no-repeat`,
            backgroundSize: '1500px 1000px',
            backgroundPosition: '-800px -575px',
            height: 2,
            left: '50%',
            transform: 'translateX(-50%)',
          },

          '&::before': {
            width: 250,
            top: 0,
          },

          '&::after': {
            width: 125,
            top: theme.space.base,
          },
        },
      ]}
      className={clsx('ZS__Footer', className)}
      {...rest}
    >
      Copyright © {new Date().getFullYear()} Zach Schnackel. Penalty is 🔥
      <div
        css={{
          display: 'grid',
          marginTop: theme.space.small,
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
          gap: theme.space.base,
          gridAutoFlow: 'column',
          gridAutoColumns: 'auto',
        }}
      >
        <FooterLink href="https://github.com/zslabs/zslabs.com">
          Source
        </FooterLink>
        <FooterLink href="https://list.zslabs.com" title="List">
          <Icon size="medium" icon="list-logo" />
        </FooterLink>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  className: PropTypes.string,
  runAnimation: PropTypes.bool,
}

export default Footer
