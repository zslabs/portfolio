import { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import useMount from 'react-use/lib/useMount';
import { useStaticQuery, graphql } from 'gatsby';
import { TimelineMax } from 'gsap/TweenMax';
import {
  Button,
  Container,
  Inline,
  List,
  ListItem,
  Section,
  SectionTitle,
} from 'chaoskit/src/components';
import { link, misc } from 'chaoskit/src/assets/styles/utility';
import { generateGradient } from 'chaoskit/src/assets/styles/utility/gradient';
import { withTheme } from 'emotion-theming';

import Foundation from '../layouts/Foundation';
import Link from '../components/Link';
import { ZSContext } from '../components/ZSContext';
import { backgroundDots } from '../helpers/config';
import pattern from '../assets/media/pattern.png';

const Index = ({ theme }) => {
  const { dispatch } = useContext(ZSContext);

  const introTitle = useRef();
  const introTitleSub = useRef();
  const articleButtonRef = useRef();
  const experienceButtonRef = useRef();
  const projectsRef = useRef();
  const latestArticleRef = useRef();

  const {
    latestArticle: {
      edges: [latestArticle],
    },
    projects: { childDataYaml: pageData },
  } = useStaticQuery(graphql`
    query IndexPageData {
      latestArticle: allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: {
          fileAbsolutePath: { regex: "/src/articles/" }
          frontmatter: { title: { ne: "BLUEPRINT" } }
        }
        limit: 1
      ) {
        edges {
          node {
            frontmatter {
              title
            }
            fields {
              fullUrl
            }
          }
        }
      }

      projects: file(name: { eq: "projects" }) {
        childDataYaml {
          projects {
            title
            url
            description
          }
        }
      }
    }
  `);

  const runAnimation = () => {
    const pageTimeline = new TimelineMax({
      delay: 1,
    });

    pageTimeline
      .to(introTitle.current, 0.5, {
        y: 0,
        autoAlpha: 1,
        ease: theme.gsap.transition.bounce,
      })
      .to(introTitleSub.current, 0.5, {
        y: 0,
        autoAlpha: 1,
        ease: theme.gsap.transition.bounce,
      })
      .to(
        articleButtonRef.current,
        0.5,
        {
          scale: 1,
          autoAlpha: 1,
          ease: theme.gsap.transition.bounce,
        },
        'introButtons'
      )
      .to(
        experienceButtonRef.current,
        0.75,
        {
          delay: 0.125,
          scale: 1,
          autoAlpha: 1,
          ease: theme.gsap.transition.bounce,
        },
        'introButtons'
      )
      .to(latestArticleRef.current, 0.25, {
        autoAlpha: 1,
      })
      .to(projectsRef.current, 0.5, {
        delay: 0.25,
        autoAlpha: 1,
      });
  };

  useMount(() => {
    runAnimation();
  });

  return (
    <Foundation runAnimation>
      <Section size="xlarge">
        <div css={{ textAlign: 'center' }}>
          <h5
            css={{
              ...theme.fontSize.medium__fluid,
              color: theme.fontColor.muted,
              marginBottom: theme.space.small,
              // GSAP
              opacity: 0,
              transform: 'translateY(100%)',
            }}
            ref={introTitleSub}
          >
            Full-Stack/Motion Developer
          </h5>
          <h1
            css={{
              marginTop: 0,
              ...misc.fluidSize({
                theme,
                property: 'fontSize',
                from: theme.fontSize.h1,
                to: theme.fontSize.h1 * 1.5,
              }),
              // GSAP
              opacity: 0,
              transform: 'translateY(50%)',
            }}
            ref={introTitle}
          >
            Zach Schnackel
          </h1>
        </div>
        <div css={{ marginTop: theme.space.large }}>
          <Inline size="medium" css={{ justifyContent: 'center' }}>
            <div
              css={{
                // GSAP
                transformOrigin: 'center center',
                transform: 'scale(0)',
                opacity: 0,
              }}
              ref={articleButtonRef}
            >
              <Button
                onClick={() => {
                  dispatch({
                    type: 'toggleOffCanvas',
                  });
                }}
                type="primary"
              >
                Articles
              </Button>
            </div>
            <div
              css={{
                // GSAP
                transformOrigin: 'center center',
                transform: 'scale(0)',
                opacity: 0,
              }}
              ref={experienceButtonRef}
            >
              <Button type="secondary" url="/experience/">
                Experience
              </Button>
            </div>
          </Inline>
        </div>
        <Link
          className="u-linkDefault home__latestArticle"
          to={latestArticle.node.fields.fullUrl}
          ref={latestArticleRef}
          css={[
            misc.fluidSize({
              theme,
              property: 'marginTop',
              from: theme.space.xlarge,
              to: theme.space.large * 1.5,
            }),
            link.reset(theme),
            {
              textAlign: 'center',
              display: 'inline-flex',
              flexDirection: 'column',
              padding: theme.space.base,
              position: 'relative',
              left: '50%',
              zIndex: 1,
              transform: 'translateX(-50%)',
              transition: `transform ${theme.timing.base} ${theme.transition.bounce}`,

              // GSAP
              opacity: 0,

              '&:hover, &:focus': {
                transform: 'translateX(-50%) scale(1.05)',
              },

              '&::before, &::after': {
                content: "''",
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: generateGradient({
                  start: theme.color.light.base,
                  stop: theme.color.panel.base,
                  position: 'to bottom right',
                }),
                transform: 'skew(-15deg)',
              },

              '&::before': {
                zIndex: -1,
              },

              '&::after': {
                zIndex: -2,
                backgroundImage: `url(${pattern})`,
                backgroundPosition: '-600px -575px',
                backgroundSize: '1500px 1000px',
                backgroundRepeat: 'no-repeat',
                opacity: theme.opacity.base,
                transform: `skew(-15deg) translate(-${theme.space.small}px, -${theme.space.small}px)`,
              },
            },
            [theme.mq.small] && {
              minWidth: `calc(${theme.breakpoint.small}px * 0.75)`,
            },
          ]}
        >
          <div>
            <span
              css={{ fontSize: theme.fontSize.medium }}
              role="img"
              aria-label="Hooray!"
            >
              🎉
            </span>{' '}
            Check out my latest article:
          </div>
          <div css={{ fontWeight: theme.fontWeight.bold }}>
            {latestArticle.node.frontmatter.title}
          </div>
        </Link>
      </Section>
      <Section
        ref={projectsRef}
        id="recent-projects"
        css={{
          // GSAP
          opacity: 0,

          position: 'relative',
          left: '50%',
          margin: `0 calc(var(--rw) / -2)`,
          right: '50%',
          width: 'var(--rw)',

          '&::before': {
            ...backgroundDots(theme.fontColor.muted),
            zIndex: -2,
            maskImage: 'linear-gradient(transparent 5%, #000)',
          },
        }}
        className="section--projects"
      >
        <Container
          css={{
            paddingLeft: theme.space.base,
            paddingRight: theme.space.base,
          }}
          size="small"
        >
          <SectionTitle title="Recent Projects" />
          <div className="row u-flexCenter">
            <div className="column-10@small column-8@medium">
              <List className="bubbleList">
                {pageData.projects.map(project => (
                  <ListItem className="bubbleList-item" key={project.title}>
                    <div className="bubbleList-item-bubble" />
                    <div className="bubbleList-item-info">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bubbleList-item-link"
                        href={project.url}
                      >
                        {project.title}
                      </a>
                      <p className="u-mt--remove u-textMedium">
                        {project.description}
                      </p>
                    </div>
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
        </Container>
      </Section>
    </Foundation>
  );
};

Index.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withTheme(Index);
