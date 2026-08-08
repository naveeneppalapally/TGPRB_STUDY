# TGPRB Current Affairs Audit

Date: 2026-08-08

Scope: Telangana Police Recruitment Board Constable and Sub-Inspector preparation.

This report covers the extracted-paper analysis, source recommendations, current-affairs UX audit, content audit, retention design, and the daily integration workflow.

No question papers were downloaded or searched for on the internet. The paper analysis uses the local Extracted_Text/ files and Topic_Banks/ only. Web research was used only for official source recommendations, Nuxt Content documentation, learning science, and public coaching-platform patterns.

## Executive verdict

The current-affairs pipeline works technically, but educationally it is 3/10.

It currently behaves like a headline collector:

- It finds news.
- Gemini filters some of it.
- Markdown files are created.
- Topic pages display headlines.

It does not yet behave like an exam system:

- PYQ-proven categories are missing.
- Entries contain almost no teachable facts.
- There is no active recall or FSRS path.
- Topic pages do not signal new content.
- Telangana content is noisy.
- There is no reliable event date, category, canonical source, or deduplication.

A teacher would probably say: “This is a news clipping service attached to notes, not current-affairs preparation.”

## Evidence scope and limitations

The repository contains duplicate and damaged files, so counting every filename would inflate the result.

- Constable_2015_Prelims.txt and Constable_2016_Prelims.txt are effectively the same paper.
- Constable_2015_Mains.txt and Constable_2016_Mains.txt are effectively the same paper.
- Constable_2018_Prelims.txt and SI_2018_Prelims.txt are duplicate or mislabelled versions.
- SI_2018_Mains_P4_GS.txt is unusable because it contains only a small amount of extracted text.
- SI language and arithmetic papers were checked. Current affairs appeared in the GS papers, not those sections.
- Deep_Analysis.txt was not used as a data source, in accordance with AGENTS.md.
- Topic_Banks/ is useful for locating questions but contains current-affairs misclassifications.

The reliable analytical corpus is therefore 10 unique, usable 200-question papers.

## A. Complete PYQ current-affairs analysis

### A1. Questions per paper

| Unique paper | Strict CA questions | Percentage |
|---|---:|---:|
| Constable 2015 Prelims | 18 | 9.0% |
| Constable 2015 Mains | 11 | 5.5% |
| 2018 Prelims duplicate, counted once | 13 | 6.5% |
| Constable 2018 Mains | 20 | 10.0% |
| SI 2016 Prelims | 5 | 2.5% |
| SI 2016 Mains GS | 24 | 12.0% |
| Constable 2022 Prelims | 13 | 6.5% |
| SI 2022 Prelims | 9 | 4.5% |
| Constable 2023 Mains | 16 | 8.0% |
| SI 2023 Mains GS | 25 | 12.5% |
| Total | 154 / 2,000 | 7.7% |

The strict definition counted a question as current affairs when it depended on a recent appointment, award, event, report, policy launch, current office-holder, sports result, international development, or recent Telangana development.

Borderline policy and annual-observance questions add approximately 15-25 more questions, giving a practical range of 8.5%-9% of the paper.

There is no clean standalone current-affairs section. The questions are embedded in General Studies.

### A2. Category frequency

| Rank | Primary category | Questions | Share of strict CA | Papers containing it |
|---:|---|---:|---:|---:|
| 1 | International events, summits and foreign affairs | 22 | 14.3% | 8/10 |
| 1 | Appointments and office-holders | 22 | 14.3% | 8/10 |
| 3 | Economy, data, reports and corporate events | 18 | 11.7% | 8/10 |
| 4 | Awards and honours | 16 | 10.4% | 8/10 |
| 5 | Sports results and athletes | 15 | 9.7% | 8/10 |
| 6 | Telangana-specific events | 14 | 9.1% | 6/10 |
| 7 | Government schemes, policy and infrastructure | 13 | 8.4% | 7/10 |
| 8 | Defence and security | 10 | 6.5% | 7/10 |
| 9 | Judiciary, law and commissions | 7 | 4.5% | 4/10 |
| 10 | Science and space | 6 | 3.9% | 6/10 |
| 11 | Books and literary events | 5 | 3.2% | 4/10 |
| 12 | Environment and disasters | 4 | 2.6% | 3/10 |
| 13 | Polity and elections | 2 | 1.3% | 2/10 |

Telangana is sometimes also the subject of an appointment, scheme, award, infrastructure or sports question. The table assigns each question one primary category and tracks Telangana as the primary category when the local angle dominates.

No category appears in every paper. The strongest recurring cluster is:

1. Appointments.
2. International affairs.
3. Economy and reports.
4. Awards.
5. Sports.

### A3. Difficulty pattern

Approximately:

- 35%-40% are famous or recognisable: World Cup winners, Padma awards, Rajpath renaming, major summits and prominent leaders.
- 60%-65% require serious preparation: exact Governor-State matching, report rankings, portfolio matching, obscure awardees, committee tenure, launch locations, organisation heads and named officials.

TGPRB often asks:

> Who, where, which organisation, which report, which award, which portfolio?

It does not usually ask for long analytical explanations.

### A4. Exact current-affairs question register

The following is the readable English stem from the extracted text. The repeated Telugu translation is omitted. Named lists are retained where they are part of the question. F means famous/easy, M means medium, and O means obscure. All are embedded in GS.

#### Constable 2015 Prelims

The file is labelled 2015, but questions explicitly refer to Republic Day 2016 and Union Ministers in February 2016. The exam timestamp is not present, so exact month differences cannot be calculated reliably.

- 112. “Who among the following participated in the Republic Day parade, 2016?” International/defence; January 2016; F.
- 113. “Which among the following pairs are correct?” The Imam and the Indian-Amitav Ghosh; The Shadow Lines-Chetan Bhagat; Two Lives-Vikram Seth; War Talk-Amitabh Bhattacharya. Books; date not stated; M/O.
- 114. “Which one of the following statements is not correct?” NITI Aayog established through an Act of Parliament, established through Cabinet resolution, Vice Chairman Arvind Panagariya, Chairman Prime Minister. Institution/current office; 2015-16; M.
- 115. “Who among the following headed the Constitutional Bench that invalidated NJAC Act?” Justice J.S. Kehar. Judiciary; 2015; O.
- 116. “Who among the following are nominated members of Rajya Sabha?” K.T. Tulsi, K. Parasaran and other current nominees. Current roster; 2015-16; M/O.
- 118. “Match the following Union Ministers (Feb. 2016) with portfolios”: Arun Jaitley, Anantha Kumar, Chaudhary Birendra Singh, Thawar Chand Gehlot. Appointments; February 2016; O.
- 119. “Match the following State with Chief Minister”: Goa, Nagaland, Mizoram, Uttarakhand. Appointments; 2015-16; O.
- 121. “Read the following statements: The present Attorney General is Mukul Rohatgi; the Attorney General is appointed by the Chief Justice of India; the tenure of office of Attorney General is six years.” Office-holder/judiciary; 2015-16; M/O.
- 122. “Who are the member nations in BRICS 6th Summit?” International summit; 2014; F.
- 123. “Which among the following is/are correct statements?” 14th Finance Commission headed by Y.V. Reddy; recommended 42% devolution; appointed by Union Finance Minister. Economy/governance report; 2015; M.
- 125. “After which incident, Nirbhaya Act was passed by the Parliament of India?” Legal/current event; 2012, long lookback; F.
- 126. “At which city’s railway station, the first free public Wi-Fi service was launched by RailTel in partnership with Google?” Jaipur. Infrastructure/technology; 2015; M.
- 127. “India has purchased Pilatus PC-7 trainer aircraft from” Switzerland. Defence procurement; 2012/15 context; O.
- 128. “Which country won 2014 Men’s Football World Cup?” Germany. Sports; 2014; F.
- 130. “Which country won the FIFA Women’s World Cup, 2015?” USA. Sports; July 2015; F.
- 131. “Which one of the following statement/s is/are correct?” Sustainable Development Goals adopted by the UN; Ban Ki-moon serving a second term; Ban Ki-moon alone became Secretary-General twice. International milestone; 2015; M.
- 132. “Indians who won the Pulitzer prize are” Vijay Seshadri and Siddhartha Mukherjee. Award; 2014-15; M.
- 133. “Which of the following pairs are correct?” The Da Vinci Code-Dan Brown; The Low Land-Chetan Bhagat; When God is a Traveller-Arundhati Subramaniam; Speed Post-Taslima Nasreen. Books; date not stated; M/O.

#### Constable 2015 Mains

- 168. “Read the following statements: Shanmuganathan is appointed as Governor of Meghalaya; Draupadi Murmu as Governor of Jharkhand; Tathagata Roy as Governor of Arunachal Pradesh; Najma Heptulla as Governor of Mizoram.” Appointments; 2015-16; O.
- 178. “Read the following statements: Commonwealth Games 2014 were held in Kuala Lumpur; Kabaddi World Cup 2016 will be held in Ahmedabad; National Games 2015 were held in Kerala.” Sports/events; mixed 2014-16; M.
- 180. “Mahatma Gandhi Peace Prize for the year 2014 was given to” Chandi Prasad Bhatt. Award; 2015; M.
- 182. “Read the following statements: The first state to draft its own internal security legislation is Maharashtra; Bharatiya Pravasi Divas 2017 will be hosted by Hyderabad; the first island district in India is Majuli.” Policy, event and geography; mixed 2015-17; M/O.
- 187. “The present Indian permanent representative to UNO is” Syed Akbaruddin. Appointment; current 2015; O.
- 189. “The National SC/ST Hub will be launched in the city” Ludhiana. Scheme/launch; 2015; O.
- 190. “The world’s largest solar power plant is installed in the state” Tamil Nadu. Infrastructure/energy; 2015; M.
- 196. “Consider the following statements: Supreme Court constituted Social Justice Bench in 2015; it was set up by Chief Justice H.L. Dattu; it sits every Friday.” Judiciary; 2015; O.
- 197. “The Chairman of Commission on De-Notified and Nomadic Tribes is” current commission appointment. Appointment; 2015; O.
- 198. “Bharat Nepal Maitri bus service runs between” Delhi and Kathmandu. International connectivity; 2015; M.
- 199. “Consider the following statements: Operation Rahat, 2015 was commanded by Gen. V.K. Singh; Operation Rahat is a rescue mission to evacuate Indian civilians from Syria; INS Sumitra was deployed in Operation Rahat.” Defence/current operation; 2015; M. The extracted text may contain a factual or OCR inconsistency about Syria.

#### 2018 Prelims duplicate

The Constable 2018 Prelims file is effectively the same paper as SI 2018 Prelims.

- 116. “Examine the following statements about Indian Science Congress”: 104th session at Manipur University; theme “Reaching the Unreached Through Science and Technology”; held March 16-20, 2018. Science event; 0-6 months; M.
- 117. “Match the following” institutions with current heads: T.C.A. Raghavan, Tapan Kumar Chand, Vishwas Patel, Stuti Narain Kacker/Shrimat Pandey. Appointments; 2018; O.
- 118. “Match the following Central Government Scheme” with launch month/year: National Rurban Mission, PM Fasal Bima Yojana, PM Jeevan Jyothi Bima Yojana, PM Kaushal Vikas Yojana. Schemes; 2015-16; M.
- 119. “Examine the following statements about Para-Athletics games”: Deepa Malik’s Dubai 2018 gold; world number one ranking; 2018 Asian Para-Games. Sports; 2018; M/O.
- 120. “The Supreme Court on June 5, 2018 allowed the Indian Government to implement reservation in promotion policy of SC/ST employees... What is not considered in the judgement?” Judiciary; June 2018; O.
- 121. “India’s rank in the Global Environment Performance Index, 2018 was 177 among 180 nations. Identify correct statements...” Environment/report; 2018; O.
- 123. “Examine the following statements”: Governor’s Rule imposed in Jammu and Kashmir in June 2018; B.V.R. Subrahmanyam appointed; DGP S.P. Vaid. Appointments; June 2018; O.
- 125. “In June 2018, the Union Cabinet approved the final extension of tenure of the Commission constituted to examine sub-categorization within OBCs...” G. Rohini, Article 340, tenure. Commission/policy; June 2018; O.
- 126. “Which of the following statements are correct about GST?” Current policy snapshot; 2017 implementation; M.
- 127. “Based on the IAF order in December 2016, the Supreme Court upheld the order on...” restrictions on beard/IAF personnel. Judiciary/defence; approximately 18 months; O.
- 128. “Examine the following statements about 2018 Wimbledon women’s singles tennis tournament”: Angelique Kerber defeated Serena Williams; seeding; first Wimbledon title. Sports; July 2018; F/M.
- 129. “Examine the following pairs” of contemporary books and authors, including Sourav Ganguly, Shashi Tharoor, Sanjaya Baru and Amartya Sen. Books; 2018; M.
- 130. “India’s rank in the Global Environment Performance Index...” and current rankings for Greater Hyderabad, Warangal and Karimnagar. Telangana/urban ranking; 2018; O.

#### Constable 2018 Mains

The paper references material from February 2019, so it appears to belong to the 2019 exam cycle even though the filename says 2018.

- 116. “Read the following pairs about the International Day of the Girl Child”: October 11; UNESCO. Annual observance; current 2018/19; F/M.
- 117. “The following countries are the major importers of liquified petroleum gas during 2018-19: Japan, India, China. Choose them in descending order.” Economy/data; 2018-19; M.
- 118. “Read the following statements about the World Sustainable Development Summit 2019”: held February 2019 in New Delhi; theme “Institutional Framework for Sustainable Development.” Summit; near exam; O.
- 119. “As per the World Employment and Social Outlook Trends 2019 report published by the ILO in February 2019, the global unemployment rate in 2018 was...” Economy/report; near exam; O.
- 120. “Who among the following was honoured in February 2019 with the Freedom of the City of London award...” Sanjiv Chadha. Award/appointment; near exam; O.
- 121. “Read the following pairs: Changing India-Manmohan Singh; I Do What I Do-Urjit Patel.” Books/economy; 2018; M.
- 122. “Read the following statements about the Astronomical Society of India”: Dr G.C. Anupama became its first female president; elected for biennium 2019-21. Appointment; near exam; O.
- 123. “Read the following pairs: National Girl Child Day-11 October; theme of National Girl Child Day 2019-Empowering Girls for a Brighter Tomorrow.” Observance; 2019; F/M.
- 124. “Assertion: A disaster relief exercise, Exercise Rahat, was demonstrated in Rajasthan in February 2019. Reason: it was organised to synergise efforts for humanitarian assistance and disaster relief operations.” Defence/disaster; near exam; O.
- 125. “Read the following statements: Abhinandan Varthaman is an IAF Air Commodore; he is the first recipient of Bhagwan Mahavir Ahimsa Puraskar; the award carries a cash prize of Rs. 5 lakh.” Person/award; February 2019; M/O.
- 126. “The government-funded health insurance scheme, the Pradhan Mantri Jan Arogya Yojana, was launched in September 2018 by the Prime Minister of India in” Ranchi. Scheme; approximately six months; F/M.
- 127. “Match the following central agencies with their Directors General”: BSF-Rajni Kant Mishra; CSIR-Shekar C. Mande; ITBP-S.S. Deswal/Jalaj Srivastava. Appointments; 2019; O.
- 128. “Read the following statements about High Courts in India”: separate Andhra Pradesh High Court from January 1, 2019; India has 27 High Courts as on March 1, 2019. Judiciary; 1-2 months; M.
- 129. “Match the following”: Ashok Chakra 2019, Carnot Prize 2018, Padma Bhushan 2019, Philip Kotler Presidential Award with awardees. Awards; 2018-19; O.
- 130. “India’s heaviest communication satellite GSAT-11 was launched successfully in December 2018 from” French Guiana. Space; 2-3 months; M.
- 131. “Aero India 2019 was opened in” Bengaluru. Defence event; near exam; M.
- 132. “The Corruption Perceptions Index 2018 of Transparency International ranked India at” 78/180. Report; 2018; O.
- 133. “Read the following pairs: LAWASIA Human Rights Conference 2019-New Delhi; World Governments Summit-Hyderabad.” Summits/conferences; near exam; M.
- 134. “Read the following statements: the DRDO Chairman is Dr G. Satheesh Reddy; he is Secretary of Defence R&D; he is a winner of the 2019 Missile Systems Award.” Defence/appointment/award; near exam; O.
- 135. “Read the following statements about the Australian Open Tennis Men’s singles final match held in 2019”: Novak Djokovic defeated Rafael Nadal in straight sets; Djokovic won the title for a record ninth time. Sports; January 2019; F/M.

#### SI 2016 Prelims

- 124. “Which state government has launched a scheme titled Ashray to save girl child? What is the main aim of the scheme?” Rajasthan placing specially designed cradles in 65 hospitals. Scheme; current 2016; O.
- 125. “The Intellectual Property Appellate Board has ordered Chennai-based Geographical Indication Registry to issue Geographical Indication tag for basmati rice, applicable to seven Indian states. Which of the following is correct?” Agriculture/legal policy; current; O.
- 130. “Who has won the 2016 William E. Colby Award for best military book? What is the title of the book?” Nisid Hazari, Midnight Furies. Award/book; 2016; O.
- 161. “Which of the following is not an objective of Swachha Bharat Mission?” Scheme; 2014 policy, active current snapshot; M.
- 165. “Consider the following statements about key features of 100 Smart City project”: automatic traffic signals, better public transport, face identification to catch criminals. Policy; 2015-16; M.

#### SI 2016 Mains GS

- 31. Teachers’ Day in India and World Teachers’ Day are celebrated on September 5; 2016 theme “Valuing Teachers, Improving Their Status.” Observance; 2016; F/M.
- 32. “Read the following statements about National Science Day”: February 28; discovery of Raman Effect; 2016 theme “Science for Sustainable Development.” Science/observance; 2016; F/M.
- 33. “Read the following statements on World Habitat Day”: first Monday of October; 2016 theme “Habitat for All.” Environment/observance; 2016; M.
- 34. “Assertion: National Mathematics Day is observed on December 22 every year from 2012. Reason: tribute to Srinivasa Ramanujan.” Observance; 2016; M.
- 35. “Which of the following books and authors are correctly matched?” including People of the Sun, M.S. Dhoni, and Karachi, You’re Killing Me. Books; recent publications; M/O.
- 36. “Read the following statements: Russia is the largest producer of oil; Saudi Arabia is the largest producer of gas; Venezuela has the largest reserves of oil; Qatar has the largest reserves of gas.” Economy/data; current snapshot; M.
- 37. “Read the following statements: the US presidential election is scheduled for November 9, 2016; Donald Trump is the Republican nominee; Hillary Clinton is the Democratic nominee; Clinton was previously Defence Minister.” International politics; 2016; M.
- 38. “Read the following statements about Global Competitive Index”: World Economic Forum released it; USA topped 2016-17; India ranked 39th of 138. Economy/report; 2016; O.
- 39. “Read the following statements about International Day for the Preservation of the Ozone Layer”: September 16; designated by UNGA in 1994; 2016 theme “Ozone and Climate: Restored by a World United.” Environment; 2016; M.
- 41. Match 2016 sports awards: Dhyan Chand Award, Dronacharya Award, Maulana Abul Kalam Azad Trophy and Rajiv Gandhi Khel Ratna Award. Sports awards; 2016; O.
- 42. Match athletes and sports: Neeraj Chopra-javelin, Mariyappan Thangavelu-high jump, S. Pradeep Kumar-swimming, Jitu Rai-shooting. Sports; 2016; M/O.
- 43. “Read the following statements about FIFA World Cup”: 2014 winner, 2015 Ballon d’Or, 2018 host, 2022 host. Sports/international; mixed; F/M.
- 44. “Assertion: RBI brought down repo rate by 0.25% to 6.25% on September 4, 2016.” Economy/RBI; same month; M.
- 45. “Read the following statements about Gold Monetisation Scheme”: launched November 5, 2015; 3% interest; capital gains exemption. Scheme/economy; approximately 9-12 months; M.
- 47. “Which of the following are Nav Ratna category industries in India, as on May 31, 2016?” Economy/PSUs; 2016; O.
- 49. “Read the following statements about service sector in India”: above 60% of GDP in 2015-16; India second-largest services exporter. Economy/data; 2016; M.
- 50. Match 2016 awardees: Bezwada Wilson-Ramon Magsaysay, Deepa Karmakar-Khel Ratna, Nagapuri Ramesh-Dronacharya, Lalita Babar-Arjuna. Awards/sports; 2016; O.
- 54. “Read the following statements: new PTI chairman Riyadh Mathew; Sudhir Pratap Singh appointed NSG DG; R.K. Pachnanda appointed NDRF DG.” Appointments/security; 2016; O.
- 55. “Assertion: Yoshinori Ohsumi was awarded the Nobel Prize in Biology; Reason: discoveries about autophagy.” Science award; October 2016; M.
- 56. “Assertion: Nobel Prize in Economics was won by Angus Deaton; Reason: analysis of consumption, poverty and welfare.” Economy award; 2015; M.
- 57. “As per the 62nd National Film Awards 2015, which pairs are correct?” Telugu Chandamama Kathalu, Hindi Queen, Dhanush and Kangana Ranaut. Awards; 2015; M.
- 58. “The newly appointed Chairperson of the Ethics Committee of Lok Sabha is” Sharad Yadav. Appointment/polity; 2016; O.
- 59. “Read the following statements: Swachh Bharat launched October 2, 2014; aims at ODF India by 2019; Swachh Survekshan Gramin 2016 adjudged Sikkim cleanest.” Scheme/report; 2014-16; M.
- 60. “Char Dham project is to build new national highways connecting” Kedarnath, Badrinath, Gangotri and Yamunotri. Infrastructure; 2016; M.

#### Constable 2022 Prelims

The exact exam date is not printed clearly in the extracted file.

- 77. “India’s rank in the World Competitiveness Index 2022 is” 4/37/40/39. Economy/report; 2022; O.
- 85. “[OCR blank] ship was decommissioned at Naval Dockyard in Mumbai.” Defence; 2022; M.
- 91. “Who received 57th Jnanpith Award?” Nilmani Phookan Jr. Award; 2021-22; O.
- 107. “Who is the first woman combat pilot in Indian Army?” Captain Abhilasha Barak. Defence/person; 2022; M.
- 109. “P.K. Sinha recently stepped down from which position?” Economic Affairs Secretary, Principal Advisor to PM, Education Secretary or NITI Aayog CEO. Appointment; recent; O.
- 111. “Navneet Kaur, the player in recent news, is associated with” Hockey. Sports/person; recent; M.
- 118. “A recent mega merger of a bank and a non-banking finance company involved” HDFC and HDFC Bank. Economy/corporate; 2022; M.
- 119. “Danish Siddiqui, the Pulitzer Prize winner for feature photography, worked for” Reuters. Award/person; 2021; O.
- 144. “Buddhavanam, a Buddhist heritage theme park, was inaugurated recently at” Nagarjunakonda. Telangana/inauguration; 2022; M.
- 150. “Nikhat Jareen won a Gold medal at the 2022 IBA Women’s World Boxing Championship in” Turkey/Antalya. Sports/Telangana; May 2022; F/M.
- 192. “The group of seven (G7) held its 47th summit in” England. Summit; 2021; M.
- 196. “India signed an agreement to sell Brahmos supersonic cruise missile to recently” the Philippines. Defence/international; 2022; M.
- 197. “[OCR damaged] The recently restored 20-year-old heritage building in Osmania University College for Women...” Telangana heritage; recent; O.

#### SI 2022 Prelims

The extracted paper identifies the exam as 7 August 2022.

- 101. “_____ is expected to host the summit meeting of Shanghai Cooperation Organization in 2023.” India. Summit; approximately 12 months ahead; M.
- 102. “The Election Commission has announced polls for Rajya Sabha seats that fell vacant between June and August 2022.” The question asks the number of seats. Election/current polity; near exam; O.
- 104. “As the American automobile company Ford exits India, its manufacturing unit in Gujarat has been taken over by” Mahindra. Economy/corporate; 2022; M.
- 105. “Recently, the International Labour Organization directed that there should be no barriers to people with different sexual orientations. They should be described as” LGBTIQ people. International/social policy; 2022; O.
- 106. “The Indian Army plans to create an integrated battle group combining strike formation on northern border and” hold formation on western border. Defence; 2022; O.
- 109. “TSRTC filed a ___ case against Rapido organization over an advertisement.” Defamation. Telangana/legal; recent; O.
- 110. “Russia has overtaken which country to become India’s second biggest supplier of oil?” Saudi Arabia. Economy/geopolitics; 2022; M.
- 111. “Which country became the 4th new member of the New Development Bank in 2021?” Egypt. International institution; 2021; O.
- 113. “Cyclone Asani, which formed in May 2022, affected [which] state?” Andhra Pradesh. Environment/disaster; approximately 3 months; M.

#### Constable 2023 Mains

The paper is dated 30 April 2023.

- “What is the theme of Nobel Prize Summit 2023 to be held in May 2023 and where will it be held?” Truth, Trust and Hope; Washington D.C. Summit; near exam; O.
- 65. “The new name given to Delhi Rajpath (King’s way) is” Kartavyapath. Governance; approximately 7 months; F.
- 74/OCR block. “Identify the Indian-origin leaders across the world”: Rishi Sunak, Kamala Harris and Pravind Jugnauth. Appointments; current; F/M.
- 86. Match Governors with states: S. Abdul Nazeer, Ramesh Bais, Anandiben Patel, Arif Mohammad Khan and Satyadev Narain Arya. Appointments; 2023; O.
- 92. “Which of the following policies has been approved by Union Government that aims to boost the country’s Space Department role?” Indian Space Policy 2023. Science/policy; near exam; M.
- 96. “The _____ was launched by Government of India in March 2023. What is the full form of NILP?” New India Literacy Programme. Scheme; 1-2 months; M.
- 105. “Identify the people who attended World Economic Forum 2023 at Davos, from India”: Eknath Shinde, Gautam Adani, K. Taraka Rama Rao, Mukesh Ambani and others. Summit/economy; January 2023; M.
- 121. “Which sport is related to the player by name Satyawarth Kadiyan?” Wrestling. Sports; recent; M.
- 126. “Which state in India won UN-Habitat World Habitat Awards 2023 for JAGA Mission programme?” Odisha. Award/scheme; 2023; O.
- 129. “Which state has started a campaign to ensure purity of milk and dairy production as ‘Pure for Sure’?” Telangana. State scheme; 2023; O.
- 133. “Who received the 2023 International Prize in Statistics equivalent to the Nobel Prize in Statistics?” C.R. Rao. Award; 2023; M.
- 146. “BALAGAM movie won the ONYKO FILMS Award in March 2023 in which category?” Film award/Telangana; 1-2 months; O.
- 155. “[OCR damaged] Which Asian country had the highest Gross Domestic Product in 2022?” Economy/data; 2022; M.
- 169. “Which organization is planning to start larger floating Solar Power Plant in Telangana?” NTPC. Telangana infrastructure; recent; M.
- 172. “Which Wing of Indian Armed Force signed Memorandum of Understanding with IIT Madras for technology development?” Indian Air Force. Defence/technology; recent; O.
- 181. “Which of the following is related to DHRUVA Portal belonging to Telangana Government?” Telangana governance/portal; recent; O.

#### SI 2023 Mains GS

The paper is dated 9 April 2023.

- “China is reportedly building a new dam on Mabja Zangbo river in Tibet at the trijunction with India and Nepal, the other side of the state...” Sikkim. Geography/defence; recent; M.
- “ITC Ltd. Company opened a new unit in January 2023 to produce biscuits, chips and noodles at ___ in Telangana.” Katedan, Hyderabad. Telangana industry; 3 months; O.
- “Which village in Telangana has been selected as one of the best tourism villages by UNWTO for the year 2021?” Pochampally. Telangana/international award; long lag; O.
- “Russia has withdrawn from its last nuclear arms control pact with the United States in February 2023. What is the name of the pact?” New START. International/defence; 2 months; M.
- “Who is the Union Environmental Secretary of India?” Leena Nandan. Appointment; current; O.
- “In February 2023, ISRO carried out the first successful launch using its new rocket.” Small Satellite Launch Vehicle. Space; 2 months; M.
- “The income of the Life Sciences sector in Telangana was worth around ___ in 2022.” 100 billion dollars. Telangana/economy; 4-12 months; M.
- “Who was the last Nizam of Hyderabad, who passed away in January 2023?” Mir Barkat Ali Mukarram Jah. Telangana/person; 3 months; O.
- “Who won the 2023 Border-Gavaskar Trophy?” India. Sports; 1 month; F.
- “Who among the following was awarded the Padma Vibhushan Award for the year 2023?” Vani Jayaram. Award; 3 months; M.
- “Volodymyr Zelenskiy is the president of” Ukraine. International office-holder; current; F.
- “India won the first ICC under-19 Women’s World Cup in Cricket by defeating” England. Sports; January 2023; F.
- “What is the target inflation rate set by the Reserve Bank of India for the financial year 2022-23?” 4%. Economy/RBI; current financial year; M.
- “Indian start-ups received a funding of around ___ in 2022, according to PWC.” 24 billion dollars. Economy/report; 4-12 months; M.
- “USA has banned export of advanced semiconductors to ___ country.” China. International/technology; approximately 6 months; M.
- “In India, name the present Chairperson of Rajya Sabha.” Jagdeep Dhankhar. Appointment; current; F/M.
- “Which country’s President was Chief Guest at Indian Republic Day Celebrations held in 2023?” Egypt. International event; January 2023; F/M.
- “India’s Unified Payments Interface payment system has been linked with ___ country’s PayNow system in February 2023.” Singapore. International/economy; 2 months; M.
- “Who won the Hyderabad E-Prix Formula-E car race in February 2023?” Jean-Eric Vergne. Sports/Telangana; 2 months; M.
- “Name the current Solicitor General of India.” Tushar Mehta. Appointment; current; O.
- “The Information Technology and ITeS exports from Telangana for FY 2022-2023 is about” a numerical amount. Telangana/economy; current financial year; O.
- “For the Financial Year 2023-24, Budget of Telangana State is” a numerical amount. Telangana budget; near exam; O.
- “Name the Chief Executive Officer of Abu Dhabi National Oil Company who has been appointed as President of the next UN Climate Summit COP-28.” Sultan al-Jaber. International appointment; 8-9 months; O.
- “Name the former international athlete and coach who chaired the proceedings in Rajya Sabha in 2023.” P.T. Usha. Appointment/sports; current; M.
- “The Press Council of India has chosen ___ for the Raja Rammohan Roy Award for Excellence in Journalism in 2023.” Award; 2023; O.

### A5. Recency distribution

The papers do not consistently contain an exam date, and many questions give only a year or no event date. Therefore an exact per-question month calculation is not defensible.

| Event age before exam | Observed pattern |
|---|---|
| 0-6 months | Dominant window, approximately 70%-80% of date-anchored CA |
| 7-12 months | Meaningful secondary window, approximately 15%-20% |
| 13-24 months | Small but real tail, approximately 5%-10% |
| More than 24 months or undated | Long tail, often old sports, older policy, books or static-current snapshots |

Examples of the long tail:

- 2012 Nirbhaya Act and Pilatus procurement.
- 2014 BRICS and Football World Cup.
- 2014-15 awards and schemes.
- 2016 questions appearing alongside 2018 material.
- Older schemes tested because their launch details remain examinable.

The repository rule of prioritising the last six months and retaining up to 365 days is sensible. The when:7d Google News queries in the scraper are not sufficient by themselves for that policy.

### A6. Constable versus SI

Using only non-duplicate papers:

| Group | Papers | CA questions | Average |
|---|---:|---:|---:|
| Constable | 5 | 78 / 1,000 | 15.6 per paper, 7.8% |
| SI | 4 | 63 / 800 | 15.75 per paper, 7.9% |
| 2018 duplicate prelim | 1 | 13 / 200 | 6.5% |

There is no evidence that SI simply asks more current affairs by count.

The difference is depth:

- Constable questions more often ask direct recognition: winner, place, scheme, state or country.
- SI questions more often ask report figures, policy details, office-holders, commissions, official terminology and institutional relationships.
- Both need the same high-yield categories, but SI needs one extra layer of factual context.

### A7. Top 10 predictable question types

These are not guarantees. They are the strongest evidence-backed preparation priorities.

1. Recent appointments and office-holders.
2. Sports winners, medals and notable athletes.
3. National, literary, sports, film and journalism awards.
4. Telangana schemes, budgets, inaugurations and named projects.
5. RBI, inflation, GDP, rankings, indices and official reports.
6. Defence exercises, procurement, missiles and space launches.
7. India-linked summits, agreements and international institutions.
8. Flagship government schemes and launch details.
9. Science milestones, space missions and major environment events.
10. Recent judicial decisions, commissions, High Court developments and legal-policy changes.

## B. Source recommendation table

Official sources are preferable for facts such as names, dates, awards, launch locations and figures. For example, the RBI publishes monetary-policy material and statistics, MEA publishes official diplomatic statements, and Telangana publishes press releases, government orders and budget documents. These are much safer than turning a secondary headline directly into a study fact.

| PYQ category | Best source to scrape | Why this source over others |
|---|---|---|
| Appointments and office-holders | PIB Appointment Committee orders, President and department websites | PYQs repeatedly ask exact names and posts. Official orders give the authoritative name, post and date. Current status: major gap. |
| International summits and agreements | Ministry of External Affairs What’s New | MEA gives official summit outcomes, bilateral agreements, visiting leaders and India’s role. Google News can miss the exact India-linked fact. Gap. |
| Awards and honours | PIB, Ministry of Culture, Sahitya Akademi/Jnanpith and Sports Ministry awards | Awards were present in 8/10 papers. Award bodies provide clean awardee-category-year data. Gap. |
| Sports results | Sports Ministry, SAI and the relevant federation or event website | Sports appeared in 8/10 papers. Results and medal facts are structured and time-sensitive. Gap. |
| Telangana schemes and launches | Telangana State Portal initiatives, official department press releases and GOs | PYQs ask scheme names, amounts, locations and beneficiaries. The official portal provides those details, unlike a short newspaper headline. Current coverage is partial and noisy. |
| Telangana budget and figures | Telangana Budget portal and Budget in Brief | SI questions explicitly ask Telangana budget, exports and sector figures. Budget documents are the primary source for amounts. Gap. |
| Telangana police-specific events | TGPRB and Telangana Police | Recruitment notifications, police initiatives, awards, operations and appointments should come from the institutions themselves. Zero systematic coverage. |
| Economy, RBI and inflation | RBI Bulletin, RBI press releases, MoSPI, Finance Ministry and SEBI | Economy appeared in 8/10 papers. Official releases provide the exact rate, date and figure. Current generic economy feed is only partial. |
| Defence and security | PIB Defence, MoD, DRDO press archive, Army/Navy/Air Force | PYQs ask exercises, procurement, organisations, missiles and appointments. Defence releases contain named systems, locations and services. Gap. |
| Space and science | ISRO press releases and mission archive, DST, CSIR and MeitY | SI 2023 asked SSLV directly. ISRO provides mission name, vehicle, payload and date. Current generic science feed is too broad. |
| Environment and disasters | MoEFCC, NTCA, WII, NDMA and IMD cyclone bulletins | When asked, questions depend on exact rankings, cyclone states and named reports. Current coverage is broad but not official-source based. |
| Judiciary and commissions | Supreme Court press releases, judgments and Department of Justice | PYQs ask NJAC, reservation judgments, High Courts and commissions. The Court’s official material is more reliable than a news summary. Gap. |
| Books and literary awards | Sahitya Akademi, Jnanpith and publisher or author announcements | Books appeared repeatedly, often as obscure author-title matching. News RSS will not reliably identify the exam-relevant pair. Gap. |

### Source-gap priority

Ranked by expected exam impact:

1. Appointments and office-holders.
2. International affairs and MEA.
3. Awards and honours.
4. Sports.
5. Economy, RBI, MoSPI and Finance.
6. Defence and space.
7. Telangana official schemes, budgets and government orders.
8. Judiciary and commissions.
9. Environment, IMD and wildlife.

### Reliability assessment

- Highest reliability: official orders, government press releases, RBI/MoSPI reports, ISRO/DRDO releases and award lists.
- Good discovery sources: Telangana Today, Hans India and The Hindu.
- Poor as final study sources: Google News headlines, listicles, opinion articles, “10 things to know” articles and generic explainers.

Google News should be treated as a discovery layer. The saved entry should contain a canonical primary source whenever one exists.

Useful official source pages:

- [PIB Padma Awards](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2218547&lang=1&reg=3)
- [MEA What’s New](https://www.mea.gov.in/whats-new.htm)
- [Telangana Government Initiatives](https://www.telangana.gov.in/Government-Initiatives/)
- [Telangana Budget](https://www.telangana.gov.in/budget-2026-2027/)
- [RBI Bulletin](https://bulletin.rbi.org.in/)
- [Sports Ministry Awards and Awardees](https://yas.nic.in/sports/awards-awardees)
- [DRDO Press Release Archive](https://drdo.gov.in/drdo/en/documents/press-release/archive)
- [ISRO Press Releases](https://www.isro.gov.in/Press.html)
- [Supreme Court Press Releases](https://www.sci.gov.in/press-release/)
- [TGPRB](https://www.tgprb.in/)
- [Telangana Police](https://www.tspolice.gov.in/)

## C. Silent update solution

### What exists now

There is currently no per-topic new-content mechanism.

- components/CurrentAffairsStrip.vue fetches all current-affairs documents, filters them by related_topic_ids and sorts them by meta.date.
- It has no last-visit timestamp, unread state, count or “new since last visit” section.
- It renders every matching item in an unbounded horizontal list.
- components/WhatsNewSlideover.vue calculates recent, but the template loops over entries rather than recent or entriesInPanel. The badge counts recent entries while the panel can render all entries.
- pages/index.vue shows the latest eight headlines but does not group them by topic or take the user to the topic page.
- The homepage links directly to the external source.
- Sidebar badges are static UI badges, not unread counts.
- There is no localStorage read state.
- server/database/schema.sql has review cards, gates and review logs, but no topic-visit table.
- pages/notes/geography/[slug].vue does not include the current-affairs strip.
- Only the drainage page is wired correctly with the strip.

The student currently has no reliable way to know that a completed topic changed.

### Recommended experience

Use four connected signals:

Topic card: “+3 new”

Topic page: “New since your last visit”

Student reviews the new cards

“Mark caught up” removes the badge

#### 1. Topic cards and sidebar

Show an orange or saffron badge beside the topic:

> Forests of India · 3 new

Use it in the subject listing, sidebar and homepage catch-up panel.

#### 2. Topic page

At the top of CurrentAffairsStrip:

> New since your last visit · 3

Each card should contain:

- event date,
- publication date,
- category,
- one-line exam fact,
- source,
- Practice this or Add to review.

Then show Earlier current affairs.

At the bottom show Mark this topic caught up.

Do not mark the page read merely because the route mounted. A student may open the page accidentally or never scroll to the current-affairs section.

#### 3. Homepage

Replace the undifferentiated Today’s Brief with:

> Your current-affairs catch-up  
> 4 topics have 11 new facts

Each row should open the relevant note page, not merely an external news URL.

#### 4. Bell/slideover

Keep the bell, but make it secondary. It should show topic name, number of new items, category, Review on topic page, and a deliberate mark-all-seen action.

The bell alone is insufficient. Students routinely ignore generic notification inboxes.

### Why this is natural in Nuxt 3

Nuxt Content already gives the right content model: a typed collection, frontmatter fields, filtering and ordering through queryCollection. See the [Nuxt Content queryCollection documentation](https://content.nuxt.com/docs/utils/query-collection) and [collection types](https://content.nuxt.com/docs/collections/types).

Nuxt Content does not provide user read/unread state. That belongs to the application.

#### Version 1: localStorage

For a single-user or anonymous study tool, localStorage is enough.

Store a key such as:

    tgprb:ca:last-seen:NOTE-GEO-FORESTS

Store:

- lastSeenPublishedAt,
- seenEntryIds,
- updatedAt.

Compare the stored watermark against each entry’s published_at.

#### Version 2: Supabase

When authenticated cross-device use matters, add:

    topic_visits
    - user_id
    - note_id
    - last_seen_at
    - updated_at

Optionally add:

    current_affair_reads
    - user_id
    - current_affair_id
    - read_at

Start with a topic watermark rather than one database row per headline.

### Required content fields

The current date field is not enough. Add:

- published_at,
- event_date,
- category,
- exam_fact,
- summary,
- canonical_source_url,
- source_name,
- source_type,
- related_topic_ids,
- event_key for deduplication.

Use published_at for unread status and event_date for exam recency.

### Edge cases

- First visit: do not mark the entire archive as new. Initialise the watermark to the newest existing item and show a small Start here set.
- Same-day entries: date-only comparisons can miss or group items incorrectly. Use stable IDs or timestamps.
- Backfilled articles: an article may be added today with an old event date. Unread logic must use platform publication time.
- Edited entries: preserve the original ID and expose updated if the exam fact changed.
- Deleted entries: remove them from unread calculations without corrupting the watermark.
- Topic remapping: if an item gains a new related topic, it should become new for that topic.
- Multiple devices: localStorage will not sync. Use Supabase after authentication.
- Accidental page visits: do not clear unread state on route mount.
- Timezone: store UTC and display IST.
- Unbounded growth: show 5-8 newest entries with an Open all link, not every matching item forever.

### Public coaching-platform patterns

Public pages do not reliably expose authenticated app-level unread badges, so exact private UI behaviour should not be claimed without inspecting their apps.

Their observable public pattern is clear:

- [Testbook Current Affairs](https://testbook.com/current-affairs) provides daily current-affairs pages, daily quizzes, monthly PDFs and revision tests.
- [Testbook’s quiz page](https://testbook.com/current-affairs/current-affairs-quiz) provides daily, weekly and monthly quizzes.
- [Unacademy’s Current Affairs Magazine](https://unacademy.com/content/current-affairs-magazine/) provides recurring monthly magazines.
- [Unacademy’s weekly test format](https://unacademy.com/content/upsc/current-affairs-weekly-test-series-2026/) shows daily input feeding recurring weekly tests.
- [BYJU’S current-affairs hub](https://byjus.com/current-affairs/) combines daily topics, a monthly magazine and weekly quizzes.

The transferable pattern is:

1. New material appears in a daily surface.
2. It is tested shortly afterward.
3. It is consolidated weekly.
4. It is repackaged monthly.
5. Weak areas return later.

The current website has step 1 only.

## D. Brutally honest assessment

### Score: 3/10

| Area | Score | Reason |
|---|---:|---|
| Technical ingestion | 6/10 | RSS, AI scoring and Markdown generation exist. |
| Source alignment | 2/10 | Broad Google News queries do not map to the PYQ category distribution. |
| Fact quality | 2/10 | Most entries are headlines without exam facts or summaries. |
| Telangana relevance | 2/10 | Many Telangana-labelled entries are not Telangana-specific. |
| Learning design | 1/10 | No MCQ, active recall, explanation or FSRS path. |
| Revisit mechanism | 0/10 | No last-visit or unread state. |
| Duplication and scale | 2/10 | Repeated stories, no canonical event model and unbounded strips. |

The strongest part is the architecture. The weakest part is the educational transformation from news to memory.

## E. Best format for retention

### The single most effective format

Use an exam card, not a raw headline.

Each card should be:

1. A short MCQ or one-line retrieval prompt.
2. Four answer choices when appropriate.
3. Immediate answer reveal.
4. One-sentence explanation.
5. Event date and source.
6. One static-syllabus connection.
7. Optional FSRS card.

Example:

> Which Telangana village was selected as a Best Tourism Village by UNWTO?
>
> A. Pochampally  
> B. Kaleshwaram  
> C. Vemulawada  
> D. Kawal
>
> Answer: Pochampally
>
> Exam fact: Pochampally received the recognition for the 2021 cycle.
>
> Static link: Telangana geography and culture.

This is much better than:

> Telangana village gets tourism recognition.

The PYQs are mostly short fact-retrieval questions, so the presentation should mirror that.

Practice testing and distributed practice are among the strongest-supported learning techniques. See the [Roediger and Karpicke test-enhanced learning study](https://www.psychologicalscience.org/journals/psychological-science/j.1467-9280.2006.01693.x), the [Cepeda et al. spacing review](https://pubmed.ncbi.nlm.nih.gov/16719566/), and the [Dunlosky learning-techniques review](https://pubmed.ncbi.nlm.nih.gov/26173288/).

### Daily, weekly and monthly cadence

#### Daily

- 5-8 high-quality new facts.
- Attempt first, reveal answer second.
- Save only the most testable facts.
- Keep the session under 10 minutes.

#### Weekly

- 20-30 mixed MCQs.
- Mix Telangana, appointments, awards, sports, economy and international affairs.
- Include older items so the student cannot rely on recognition from yesterday.

#### Monthly

- One capsule of the month’s highest-yield 80-120 facts.
- One mixed revision test.
- One weak-category report.
- Remove or archive low-value stories.

#### Exam month

- Prioritise the last six months.
- Then revise the 6-12 month band.
- Use a separate Telangana capsule.
- Use mixed tests, not chronological reading.
- Keep only high-confidence, high-yield cards in the final queue.

### FSRS integration

Current affairs should enter FSRS, but not as raw articles.

Create 1-3 atomic cards per important event:

- one direct fact card,
- one relationship card,
- optionally one cloze card.

Examples:

- Who won the 2023 Border-Gavaskar Trophy?
- UPI was linked with which country’s PayNow system?
- The 2023 Telangana budget amount was approximately ___.

Keep current-affairs cards separate from comprehension-gate MCQs. The existing rule remains correct: gate questions unlock learning; they should not themselves enter the review queue.

Because the exam has negative marking, the review system should also teach students when not to guess. It must not imply free guessing.

## F. Current-system gap analysis

| Gap | Evidence | What closing it looks like to the student |
|---|---|---|
| Appointments | 22 questions, 8/10 papers | A People in News capsule with Governors, Secretaries, DGs, judges, Rajya Sabha officials and international appointees. |
| Awards | 16 questions, 8/10 | Award, awardee, category and year cards, followed by matching MCQs. |
| Sports | 15 questions, 8/10 | Daily winners and medal table, especially Indian athletes, major championships and Telangana-linked events. |
| International affairs | 22 questions, 8/10 | India-linked summit, agreement and institution cards, not general world news. |
| Defence and space | 16 combined questions, 7/10 | Named exercise, missile, launch vehicle, organisation and location cards. |
| Telangana official facts | 14 primary questions, 6/10 | Scheme tracker, budget tracker, launch/inauguration cards and district/location facts. |
| Telangana police | No systematic coverage | A small police-specific feed for TGPRB notices, Telangana Police initiatives, awards, operations and appointments. |
| Judiciary | 7 questions, plus borderline items | What happened, which court, which constitutional provision cards. |
| Books and literary awards | 5 questions plus recurring matching style | Author-title-award matching capsule. |

### What percentage of current content is useful?

There is no exact automated percentage because current-affairs Markdown has no category field.

A manual headline audit gives this honest estimate:

- 35%-45% plausibly belongs to a PYQ-proven category.
- 55%-65% is noise, duplicate coverage, off-topic material, listicles, static explainers or insufficiently specific content.
- Almost all 211 entries are still unusable as learning objects because they contain only frontmatter and a headline.

The more alarming number is structural:

- 211 entries exist.
- Approximately 208 have no summary, exam fact, explanation or question.
- The current UI therefore exposes headlines, not preparation.

### Would the current collection prepare a student for the last three papers?

No.

By exact answer, it cannot, because the current collection is dated 2025-2026 while the 2022 and 2023 papers test 2021-2023 events.

By category, it would prepare a small subset:

- Some economy and Telangana scheme questions.
- Some environment and geography questions.
- Some general science questions.

It would not systematically prepare:

- Jnanpith Award.
- Nikhat Jareen.
- Danish Siddiqui.
- P.K. Sinha.
- G7, SCO and New Development Bank.
- BrahMos agreement.
- TSRTC-Rapido legal event.
- Hyderabad E-Prix.
- Pochampally.
- SSLV.
- UPI-PayNow.
- Current office-holders.
- Padma and Press Council awards.

### Duplicate stories

Yes. Examples include:

- Multiple RBI MPC stories around the same date.
- Repeated December RBI stories.
- Repeated GDP and budget headlines.
- Multiple versions of Sarnath and UNESCO headlines.
- History listicles covering the same UNESCO event from different angles.

The system needs event-level deduplication, not title-level deduplication.

## G. Prioritized transformation plan

| Priority | Change | What the student experiences |
|---:|---|---|
| 1 | Rebuild source selection around PYQ frequency | The daily feed contains appointments, awards, sports, Telangana, economy, international, defence and schemes in the same proportions the exam uses. |
| 2 | Convert headlines into exam cards | Every accepted item answers “What can TGPRB ask from this?” |
| 3 | Add daily quiz-first current affairs | The student retrieves the fact instead of scrolling past headlines. |
| 4 | Add topic-level new-content badges | A completed topic visibly says “3 new current-affairs facts since your last visit.” |
| 5 | Add a standalone Current Affairs module | The student has one daily queue, one weekly quiz and one monthly capsule. Topic pages remain contextual satellites. |
| 6 | Add FSRS cards for high-value events | January facts return in February, March and later instead of disappearing. |
| 7 | Build a Telangana dossier | Students see schemes, budgets, districts, inaugurations, portals, police facts and official figures in one place. |
| 8 | Add canonical sources and deduplication | The student sees one trusted event, not three copies of the same story. |
| 9 | Add source confidence and human review | Obscure facts are verified before becoming study material. |
| 10 | Add feedback analytics | Frequently missed or useful cards receive more explanation and better scheduling. |

## H. Recommended student workflow

### Every morning

1. Open the dashboard.
2. See due FSRS cards first.
3. See Current-affairs catch-up with topic counts.
4. Attempt 5-8 new cards.
5. Open the linked topic only when context is useful.
6. Mark the topic caught up after reviewing new items.

### Every weekend

1. Attempt the weekly mixed quiz.
2. Review wrong answers.
3. Add only important misses to FSRS.
4. Check the category performance report.
5. Revisit any topic with a persistent unread badge.

### Every month

1. Attempt the monthly capsule.
2. Revise appointments, awards, sports, economy and Telangana separately.
3. Review the previous two months’ wrong answers.
4. Archive noisy or superseded facts.
5. Keep a rolling six-month high-yield set.

### Three to six months before the exam

- Daily: 5-8 new facts plus due cards.
- Weekly: 20-30 mixed questions.
- Monthly: one capsule and one test.
- Final six months: highest priority.
- Previous 6-12 months: second priority.
- Older facts: retain only if repeated in PYQ patterns or unusually important.
- Final month: no endless news browsing. Use revision capsules and mixed tests.

## I. Day-by-day topic integration guide

### Before building the note

- Derive the verified PYQ count from Extracted_Text/.
- Assign the correct tier.
- Choose exactly one NOTE-{SECTION}-{TOPIC} ID.
- Identify which PYQ categories are relevant to this topic.
- Decide whether the topic needs spatial, chronological or hierarchical visuals.
- Select primary sources before selecting news keywords.

### When building the page

Add the CurrentAffairsStrip with the exact note ID after the title header and before the coverage strip:

    <CurrentAffairsStrip note-id="NOTE-..." class="mb-8" />

Also:

- Keep current affairs as a separate content type.
- Do not put current affairs directly into the note Markdown.
- Ensure dynamic note routes also receive the strip.

### When building content

Every current-affairs item should ideally include:

- stable ID,
- headline,
- category,
- event date,
- publication date,
- summary,
- exam fact,
- source name,
- canonical URL,
- source type,
- related topic IDs,
- optional Telangana flag,
- one or more MCQs.

### Backfill and feed

Per the repository workflow:

1. Run the historical backfill from January 2025 to today.
2. Add the topic to TOPIC_FEEDS.
3. Add the topic to the Gemini mapping prompt.
4. Use the PYQ category evidence to choose keywords.
5. Add official sources, not only Google News queries.
6. Keep the 365-day retention window.
7. Prioritise the last 180 days rather than deleting older material.

### Before calling the topic complete

A topic is not complete until:

- the note page renders at least one matching current-affairs card;
- the card has a useful exam fact, not just a headline;
- the source link works;
- related_topic_ids exactly match the note ID;
- the page shows a new-content count after a test entry is added;
- marking the topic caught up removes the badge;
- a newly added item makes the badge return;
- duplicate stories collapse into one event;
- the page behaves correctly with no matching entries;
- the experience works on mobile.

The repository’s own rule already requires browser verification of the strip. That should be extended to browser verification of unread behaviour.

### Healthy experience from day one to exam day

#### Day 1

The student sees no false unread backlog. They receive a small current-affairs orientation and begin with today’s cards.

#### Day 2

A new article creates a visible topic badge and appears under New since your last visit.

#### End of week

The student receives a mixed quiz that includes new and older facts.

#### End of month

The month’s important facts become a compact capsule and FSRS cards.

#### Three months before exam

The student sees a six-month revision dashboard with weak categories and Telangana coverage.

#### Exam week

The student is not scrolling through hundreds of headlines. They are revising a curated, tested, spaced set of high-confidence facts.

That is the difference between a functioning scraper and an exam-ready current-affairs system.
