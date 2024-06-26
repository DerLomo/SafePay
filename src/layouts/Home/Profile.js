import profileKatakana from 'assets/katakana-profile.svg?url';
//import profileImgLarge from 'assets/profile-large.jpg';
import profileImgPlaceholder from 'assets/profile-placeholder.jpg';
import profileImg from 'assets/LOGO.png';
import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
//import { Link } from 'components/Link';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { Transition } from 'components/Transition';
import { Fragment, useState } from 'react';
import { media } from 'utils/style';
import styles from './Profile.module.css';

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="Hi there" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      This project aims to fulfill the need for a universal payment tool, one that brings together all kinds of wallets, tokens, and networks. Our ultimate goal is mass adoption, and to achieve that, we have three main objectives:
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      For a better and more familiar user experience, we use <span style={{ fontWeight: 'bold' }}>NFC technology</span>, similar to current payment options.
      <br />
      Use <span style={{ fontWeight: 'bold' }}>any token or wallet that you need</span>, we let each user decide what is best for them.
      <br />
      Introducing the first <span style={{ fontWeight: 'bold' }}> crypto card</span>, enabling completely crypto-based payments without any third party.
    </Text>
  </Fragment>
);


export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {visible => (
          <div className={styles.content}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <a href="https://twitter.com/TNDpayments" target="_blank" rel="noopener noreferrer">
                <Button
                  secondary
                  className={styles.button}
                  data-visible={visible}
                  icon="send"
                >
                  Follow us on X
                </Button>
              </a>
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  About Us.
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  placeholder={profileImgPlaceholder}
                  srcSet={[profileImg]}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Logo"
                />
                <svg
                  aria-hidden="true"
                  width="135"
                  height="765"
                  viewBox="0 0 135 765"
                  className={styles.svg}
                  data-visible={visible}
                >
                  <use href={`${profileKatakana}#katakana-profile`} />
                </svg>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
