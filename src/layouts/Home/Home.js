import gamestackTexture2Large from 'assets/payment.jpg';
import paymentscreenLarge from 'assets/payscrren.jpg';
import verifymapLarge from 'assets/verifymap.jpg';
import smartcardLarge from 'assets/phonetocard.jpg';
import chargescreenLarge from 'assets/charge.jpg';
import gamestackTexture2Placeholder from 'assets/gamestack-list-placeholder.jpg';
import gamestackTexture2 from 'assets/gamestack-list.jpg';
import gamestackTextureLarge from 'assets/cahrge.jpeg';
import gamestackTexturePlaceholder from 'assets/gamestack-login-placeholder.jpg';
import gamestackTexture from 'assets/gamestack-login.jpg';
import sliceTextureLarge from 'assets/slice-app-large.jpg';
import sliceTexturePlaceholder from 'assets/slice-app-placeholder.jpg';
import sliceTexture from 'assets/slice-app.jpg';
import sprTextureLarge from 'assets/spr-lesson-builder-dark-large.jpg';
import sprTexturePlaceholder from 'assets/spr-lesson-builder-dark-placeholder.jpg';
import sprTexture from 'assets/spr-lesson-builder-dark.jpg';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

const disciplines = ['Global scale', 'Security-focused', 'Fast Transactions',  'Reliable', 'Daily life usage'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Meta
        title="SafePay"
        description="Solution for real live payments and crypto mass adoption."
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="Feature-1"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={1}
        title="Phone to Phone payments"
        description={
          <>
            Using NFC technology, we provide a handy and safe payment method for daily life using cryptocurrencies.
            <br />
            You have the freedom to <span style={{ fontWeight: 'bold' }}> chose your favorite wallet and token</span> to pay with.
            <br />
            No 3rd party involved, <span style={{ fontWeight: 'bold' }}>no limits</span>.
          </>
        }
        
        
        buttonText="Download the app"
        buttonLink="https://play.google.com/store/apps/details?id=com.nextpay.tnd"
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              srcSet: [gamestackTexture, gamestackTextureLarge],
              placeholder: gamestackTexturePlaceholder,
            },
            {
              srcSet: [gamestackTexture2, gamestackTexture2Large],
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="Feature-2"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={2}
        title="Chose what to Pay/Receive"
        description="Decide what token you want to pay or receive, and the app will do the rest."
        buttonText="View demo video"
        //buttonLink="/projects/smart-sparrow"
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              srcSet: [paymentscreenLarge, paymentscreenLarge],
              placeholder: gamestackTexturePlaceholder,
            },
            {
              srcSet: [chargescreenLarge, chargescreenLarge],
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="Feature-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Pay with card" 
        description="No baterry in your phone? No problem, use our debit cards and pay 100% with crypto."
        description={
          <>
            No baterry in your phone?
            <br />
            No problem,
            <br />
            Pay using a <span style={{ fontWeight: 'bold' }}>100% crypto procces</span>, encrypting the transactions with your card.
          </>
        }
        buttonText="Comingo soon"
        //buttonLink="/projects/slice"
        model={{
          type: 'laptop',
          alt: 'Annotating a biomedical image in the Slice app',
          textures: [
            {
              srcSet: [smartcardLarge, smartcardLarge],
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
