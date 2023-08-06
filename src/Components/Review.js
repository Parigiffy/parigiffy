import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";

const Review = () => {
  const [index, setIndex] = useState(0);

  const people = [
    {
      name: "Alice",
      comment:
        "This product is a game-changer! I can't believe I didn't try it sooner. The quality is excellent, and it feels comfortable and durable. The design is genius, and it delivers an unforgettable experience. I'm extremely satisfied with this purchase.",
    },
    {
      name: "John",
      comment:
        "I'm somewhat satisfied with this product. The quality is acceptable, but it's not outstanding. The design is okay, but it could be better. It does what it's supposed to, but it's not extraordinary.",
    },
    {
      name: "Emily",
      comment:
        "I can't praise this product enough! It's fantastic in every way. The quality is top-notch, and it feels premium. The design is innovative and ergonomic, making it a pleasure to use. The performance is out of this world. I'm thrilled with my purchase!",
    },
    {
      name: "Michael",
      comment:
        "I regret buying this product. The quality is poor, and it feels cheaply made. The design is unimpressive, and it's challenging to use comfortably. It didn't deliver the promised results, and I'm disappointed.",
    },
    {
      name: "Sophia",
      comment:
        "Where has this product been all my life? It's absolutely incredible! The quality is superb, and it feels like a luxurious item. The design is unique and creative, and it provides an unparalleled experience. I'm obsessed with it!",
    },
    {
      name: "William",
      comment:
        "This product is decent. The quality is acceptable, but it's not outstanding. The design is basic, and it does what it's supposed to. It's suitable for beginners, but experienced users might find it lacking.",
    },
    {
      name: "Olivia",
      comment:
        "I'm blown away by this product! The quality is outstanding, and it feels incredibly durable. The design is elegant and intuitive, and it offers an extraordinary experience. I can't stop raving about it!",
    },
    {
      name: "James",
      comment:
        "I had high hopes for this product, but it fell short of my expectations. The quality is decent, but it's not exceptional. The design is alright, but it could use some improvements. It works, but it's not mind-blowing.",
    },
    {
      name: "Sophia",
      comment: "This product exceeded my expectations! I love it.",
    },
    { name: "Jackson", comment: "Not bad, but I expected better quality." },
    {
      name: "Olivia",
      comment: "I'm satisfied with the purchase. It serves its purpose.",
    },
    {
      name: "Liam",
      comment: "Absolutely fantastic! I can't get enough of it.",
    },
    { name: "Emma", comment: "It's just okay. Not great, not terrible." },
    {
      name: "Noah",
      comment: "A bit disappointed. It didn't meet my expectations.",
    },
    { name: "Ava", comment: "Amazing product! Highly recommended." },
    { name: "Lucas", comment: "Could be better, but it's still good." },
    {
      name: "Isabella",
      comment: "Great value for money. I'm happy with my purchase.",
    },
    { name: "Mason", comment: "This is exactly what I needed. Perfect!" },
    { name: "Layla", comment: "So much fun using this product!" },
    { name: "Oliver", comment: "High-quality item. Impressive." },
    { name: "Aria", comment: "I'm very happy with my purchase. Thank you!" },
    { name: "William", comment: "Incredible performance. Very satisfied." },
    { name: "Mia", comment: "I've recommended this to all my friends!" },
    {
      name: "Ethan",
      comment: "Worth every penny. Great addition to the bedroom.",
    },
    { name: "Amelia", comment: "Best product I've ever bought. Period." },
    { name: "Michael", comment: "Works like a charm. I'm thrilled!" },
    { name: "Sophia", comment: "Fast shipping and discreet packaging. A+!" },
    { name: "James", comment: "Exactly as described. No complaints." },
    { name: "Evelyn", comment: "My partner loves it. Happy customer!" },
    { name: "Benjamin", comment: "Could not be happier with this purchase." },
    {
      name: "Harper",
      comment: "Adds some spice to our relationship. Love it!",
    },
    { name: "Elijah", comment: "It arrived earlier than expected. Awesome!" },
    { name: "Avery", comment: "I was skeptical, but it's amazing." },
    { name: "Daniel", comment: "Great design and functionality." },
    { name: "Sofia", comment: "I wish I had bought this sooner." },
    { name: "Ella", comment: "Better than I thought it would be." },
    { name: "Scarlett", comment: "The quality is top-notch." },
    { name: "Grace", comment: "Feels great and easy to use." },
    { name: "Chloe", comment: "I'm impressed with the variety of settings." },
    { name: "Liam", comment: "This product is a game-changer!" },
    {
      name: "Victoria",
      comment: "My partner and I are both thrilled with it.",
    },
    { name: "Riley", comment: "Highly durable and long-lasting." },
    { name: "Aria", comment: "Definitely worth the investment." },
    { name: "Luna", comment: "This has become our favorite toy." },
    {
      name: "Ellie",
      comment: "Great for beginners and experienced users alike.",
    },
    { name: "Zoe", comment: "Comfortable and adjustable. Fits perfectly." },
    { name: "Hannah", comment: "The size is just right. Very enjoyable." },
    { name: "Nora", comment: "Adds an exciting element to playtime." },
    { name: "Lily", comment: "I can't get enough of this!" },
    { name: "Grace", comment: "I feel more confident using this product." },
    { name: "Maya", comment: "It's like it was made just for me." },
    { name: "Skylar", comment: "The material is smooth and comfortable." },
    { name: "Eleanor", comment: "Great addition to our collection." },
    {
      name: "Ellie",
      comment: "I use this regularly and it never disappoints.",
    },
    { name: "Lillian", comment: "My partner loves using this on me." },
    {
      name: "Caroline",
      comment: "It's the perfect gift for adventurous couples.",
    },
    { name: "Aria", comment: "This product takes pleasure to the next level." },
    { name: "Hazel", comment: "I can't stop raving about it." },
    { name: "Gabriel", comment: "Extremely satisfying. Love the design." },
    { name: "Maya", comment: "It's so much fun to experiment with." },
    { name: "Liam", comment: "My new favorite toy. Absolutely amazing." },
    { name: "Elena", comment: "I'm impressed with the craftsmanship." },
    { name: "Aiden", comment: "I've tried others, but this is the best." },
    { name: "Luna", comment: "Highly recommend this product to anyone." },
    { name: "Aria", comment: "It's easy to clean and maintain." },
    { name: "Sofia", comment: "This is a must-have for spice things up." },
    { name: "Lily", comment: "The sensations are out of this world." },
    { name: "Ava", comment: "A fantastic addition to our intimate time." },
    { name: "Oliver", comment: "This product has made me very happy." },
    { name: "Grace", comment: "Great value for the price." },
    { name: "Ella", comment: "I've had a blast using this." },
    { name: "Aria", comment: "The quality is exceptional." },
    { name: "Mia", comment: "I can't believe I didn't buy this earlier." },
    { name: "Evelyn", comment: "Excellent customer service from the store." },
    { name: "Carter", comment: "I'm hooked. Can't imagine going without it." },
  ];
  const { name, comment } = people[index];
  const checkNumber = (number) => {
    if (number > people.length - 1) {
      return 0;
    }
    if (number < 0) {
      return people.length - 1;
    }
    return number;
  };

  const nextPerson = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };

  const prevPerson = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };

  const minIndex = 0;
  const maxIndex = people.length - 1;

  const getRandomPerson = () => {
    const getRandomIntInclusive = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    };

    let randomIndex = getRandomIntInclusive(minIndex, maxIndex);
    if (randomIndex === index) {
      randomIndex = index + 1;
    }
    setIndex(checkNumber(randomIndex));
  };

  return (
    <article className='review'>
      <p className='job'>{name}</p>
      <p>{comment}</p>
      <div className='button-container'>
        <button className='prev-btn' onClick={prevPerson}>
          <FaChevronLeft />
        </button>
        <button className='next-btn' onClick={nextPerson}>
          <FaChevronRight />
        </button>
      </div>
      <Button variant='outline-info' size='sm' onClick={getRandomPerson}>
        view Reviews
      </Button>
    </article>
  );
};

export default Review;
