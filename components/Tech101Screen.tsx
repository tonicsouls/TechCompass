
import React, { useState } from 'react';
import Accordion from './Accordion';

const H3 = ({ children }: { children: React.ReactNode }) => <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-4">{children}</h3>;
const H4 = ({ children }: { children: React.ReactNode }) => <h4 className="text-xl font-semibold text-gray-800 mb-2 mt-3">{children}</h4>;
const P = ({ children }: { children: React.ReactNode }) => <p className="mb-3 leading-relaxed">{children}</p>;
const UL = ({ children }: { children: React.ReactNode }) => <ul className="list-disc list-inside space-y-2 mb-3 pl-2">{children}</ul>;
const Note = ({ children }: { children: React.ReactNode }) => <div className="p-4 rounded-lg bg-yellow-100 text-yellow-900 my-4"><span className="font-bold">NOTE:</span> {children}</div>;
const Table = ({ children }: { children: React.ReactNode }) => <div className="overflow-x-auto my-4"><table className="w-full text-left border-collapse">{children}</table></div>;
const THead = ({ children }: { children: React.ReactNode }) => <thead className="bg-gray-100"><tr>{children}</tr></thead>;
const TH = ({ children }: { children: React.ReactNode }) => <th className="p-3 border border-gray-300 font-semibold">{children}</th>;
const TBody = ({ children }: { children: React.ReactNode }) => <tbody>{children}</tbody>;
const TR = ({ children }: { children: React.ReactNode }) => <tr className="border-b border-gray-200 last:border-b-0">{children}</tr>;
const TD = ({ children, isBold }: { children: React.ReactNode, isBold?: boolean }) => <td className={`p-3 border border-gray-300 align-top text-gray-800 ${isBold ? 'font-semibold' : ''}`}>{children}</td>;
const A = ({ href, children }: { href: string, children: React.ReactNode }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{children}</a>;

// Component for the original Tech 101 content
const Tech101OriginalContent = () => {
    const originalTechTopics = [
        // BEGINNER
        {
            title: 'Common Vocabulary',
            level: 'Beginner',
            content: (
                <Table>
                    <THead><TH>Word or Phrase</TH><TH>Definition</TH><TH>Examples</TH></THead>
                    <TBody>
                        <TR><TD isBold>Android</TD><TD>Google's proprietary operating system for phones and tablets</TD><TD>Android 14</TD></TR>
                        <TR><TD isBold>App</TD><TD>Commonly used to refer to smartphone-based installed programs</TD><TD>Phone, Contacts, Mail</TD></TR>
                        <TR><TD isBold>Cloud</TD><TD>Umbrella term for referring to storing data on remote servers</TD><TD>iCloud, OneDrive, Google Drive</TD></TR>
                        <TR><TD isBold>iOS</TD><TD>Apple's proprietary operating system on iPhones</TD><TD>iOS 16, iOS 17</TD></TR>
                        <TR><TD isBold>macOS</TD><TD>Apple's proprietary operating system on Macs</TD><TD>macOS 14 Sonoma</TD></TR>
                        <TR><TD isBold>Streaming</TD><TD>Watching on a platform (either paid or free) to view videos on demand</TD><TD>Netflix, Prime Video</TD></TR>
                        <TR><TD isBold>Smartphone</TD><TD>A modern day internet connected cellphone that uses apps</TD><TD>iPhone 15, Galaxy S24</TD></TR>
                        <TR><TD isBold>Tablet</TD><TD>An internet connected, large screen app-based device</TD><TD>iPad</TD></TR>
                        <TR><TD isBold>watchOS</TD><TD>Apple's proprietary operating system on Apple Watches</TD><TD>watchOS 9, watchOS 10</TD></TR>
                        <TR><TD isBold>Wearable</TD><TD>A wearable device with built-in sensors and other tech</TD><TD>Apple Watch, Fitbit, Google Glass</TD></TR>
                        <TR><TD isBold>Windows</TD><TD>Microsoft's proprietary operating system</TD><TD>Windows XP, Windows 11</TD></TR>
                    </TBody>
                </Table>
            )
        },
        {
            title: 'Tech Purchasing Advice',
            level: 'Beginner',
            content: (
                <>
                    <P>It can feel overwhelming when you need to purchase a new computer or replacement TV. Keep in mind these tips during the buying process.</P>
                    <UL>
                        <li><span className="font-bold">Do some research!</span> The newest generation of devices have plenty of cool new features but a lot of them can be overkill. Weigh your options and decide what is a high-priority feature like getting an OLED TV for super deep blacks or staying in the Apple ecosystem with an iMac to simplify things by having an all-in-one computer with a streamlined interface that pairs well with other Apple devices.</li>
                        <li><span className="font-bold">Don't believe the hype!</span> Getting a computer with a new super expensive GPU is excessive for most people unless you do some serious photo/video editing or play modern games at high graphics settings. Even lower-end dedicated GPUs aren't necessary for basic web browsing and watching videos so an integrated GPU will probably suffice. For most people, 8GB of RAM is enough these days unless you like to multi-task and have a lot of programs and browser tabs open at once.</li>
                        <li><span className="font-bold">Shop around!</span> There's so many options when it comes to buying a new device and stores often have plenty of sales going on around holidays. Don't be pressured to make a quick decision in-store with a sales rep but at least try to view the device in-person before pulling the trigger. Compare prices between at least 2 physical and 2 online-retail stores.</li>
                        <li><span className="font-bold">Use online tools!</span> If you're in the market to build a desktop, use a tool like pcpartpicker.com to ensure optimal compatibility with every peripheral before you even buy. It also gives you a few retailer options to compare prices at a glance.</li>
                        <li><span className="font-bold">Read some reviews!</span> Make sure to first read reviews of the product you intend to buy before purchasing. Some devices on Amazon have thousands of reviews describing issues with products that may effect you. When it comes to buying a new TV, rtings.com can be an excellent resource to rely on to get some in-depth details and comparisons between similar products.</li>
                    </UL>
                </>
            )
        },
        {
            title: 'Anatomy of a Scam Email',
            level: 'Beginner',
            content: (
                <>
                    <P>Most scam emails are flagged as spam or junk mail. However, a few may make it through your email's spam filter and look authentic. Here are some obvious signs to look out for.</P>
                    <div className="my-4 p-4 border border-dashed border-gray-400 rounded-lg bg-gray-50 text-center text-gray-500">[Illustrative Image of a Scam Email]</div>
                    <Note>When you receive a scam email, DO NOT click any links or buttons (known as phishing attempts). When in doubt, manually type in the website in a browser.</Note>
                </>
            )
        },
        {
            title: 'Anatomy of a Scam Text',
            level: 'Beginner',
            content: (
                <>
                    <P>Frequency of scam texts, also known as smishing attempts, is on the rise. There are several clues to look out for to determine if a text is authentic or not.</P>
                    <div className="my-4 p-4 border border-dashed border-gray-400 rounded-lg bg-gray-50 text-center text-gray-500">[Illustrative Image of a Scam Text]</div>
                    <Note>When you receive a scam text, DO NOT respond and DO NOT click any links. When in doubt, manually type in the website in a browser.</Note>
                </>
            )
        },
        {
            title: 'Browsing the Web',
            level: 'Beginner',
            content: (
                <>
                    <P>Browsing the internet today is riskier than ever before. Use the below tactics to stay safe and keep your data secure!</P>
                    <UL>
                        <li><span className="font-bold">Check that link!</span> Always be cautious when clicking on links in websites, emails and texts. Phishing (smishing when done via SMS aka texts) is a common cybersecurity attack that tries to prey on users thinking they're visiting a safe website that looks authentic and prompts for entering credentials but actually steals your data! Make sure to verify you recognize the URL of the website you're about to visit. Hovering over links in a browser should show the URL at the bottom left corner and hovering over links in an email should have a URL pop-up on screen.</li>
                        <li><span className="font-bold">Block those ads!</span> Some websites have pesky ads and pop-ups that take focus when you're trying to browse. Use an ad-block extension to mitigate these, including ads that play before videos like on Youtube. Alternatively, use a browser like Brave that includes a built-in ad blocker.</li>
                        <li><span className="font-bold">Take advantage of bookmarks!</span> Create bookmarks for commonly visited websites. Toggle on your browser's bookmark bar for easy access to see them at all times. You can even group them by categories and put them in folders to stay organized. It's also beneficial to use the same browser across devices. For example, if you're a Chrome user, login to the same Google account in Chrome on all devices to sync bookmarks and access them on each device. This also applies to other browsers like Safari, so if you have a Macbook and an iPhone and use the default Safari browser, you'll be able to see the same bookmarks on each device.</li>
                    </UL>
                </>
            )
        },
        {
            title: 'Battery Tips',
            level: 'Beginner',
            content: (
                <>
                    <P>Generally speaking, most modern devices these days have built-in rechargable Lithium-ion batteries. This battery technology allows for longer charge times, extended life span and quicker recharge times. Make sure to keep in mind the following to ensure peak performance and longevity!</P>
                    <UL>
                        <li><span className="font-bold">Fully discharge sparingly!</span> It's not good for your device's battery health to be constantly discharged from 100% down to 0%. If you can help it, try to limit a full discharge to once a week. A full discharge also allows for your device's battery to recalibrate to take a more accurate reading when done sparingly.</li>
                        <li><span className="font-bold">Don't top up all the time!</span> Constantly putting your device on the charger puts strain and extra wear and tear on the device's battery. If your battery life is at 70% for example, it's not necessary to bring it back up to 100% asap unless absolutely necessary, like if you're not able to charge it for awhile.</li>
                        <li><span className="font-bold">Replacement time?</span> Is your phone or laptop not lasting you through the day anymore? You might not need to buy an entirely new device! Most devices these days allow you to check out your device's battery health but sometimes it's buried in the settings menu. On iPhone, battery health can be found under Settings -> Battery -> Battery Health & Charging -> Maximum Capacity. If your device's battery health is below 80%, it may be worth looking into purchasing a replacement battery.</li>
                    </UL>
                </>
            )
        },
        // INTERMEDIATE
        {
            title: 'Computer Vocabulary',
            level: 'Intermediate',
            content: (
                <Table>
                    <THead><TH>Word or Phrase</TH><TH>Definition</TH></THead>
                    <TBody>
                        <TR><TD isBold>GPU (Graphics Processing Unit) / Graphics Card</TD><TD>A computer peripheral dedicated to rendering graphics on a screen</TD></TR>
                        <TR><TD isBold>HDD (Hard Disk Drive)</TD><TD>A mechanical, platter-based storage device with slow access speeds</TD></TR>
                        <TR><TD isBold>HDMI (High-Definition Multimedia Interface)</TD><TD>A digital technology that transmits audio/video used with TVs and monitors</TD></TR>
                        <TR><TD isBold>ISP (Internet Service Provider)</TD><TD>A company (like AT&T) that provides internet connection over copper or fiber</TD></TR>
                        <TR><TD isBold>LAN (Local Area Network)</TD><TD>A local network of interconnected devices</TD></TR>
                        <TR><TD isBold>Modem</TD><TD>A device connected to an ISP that enables internet access</TD></TR>
                        <TR><TD isBold>Monitor</TD><TD>A screen connected by a video cable to a desktop or built-in to a laptop</TD></TR>
                        <TR><TD isBold>Phishing</TD><TD>A malicious act of fooling a user to click a link spoofing a seemingly legit website</TD></TR>
                        <TR><TD isBold>PSU (Power Supply Unit)</TD><TD>A computer peripheral that provides power to internal components</TD></TR>
                        <TR><TD isBold>RAM (Random Access Memory)</TD><TD>A computer peripheral used to store data on a computer while powered on</TD></TR>
                        <TR><TD isBold>Remote (cloud connection)</TD><TD>Accessing something over the internet as opposed to locally</TD></TR>
                        <TR><TD isBold>Refresh Rate</TD><TD>The number of times per second (hertz) a screen updates its image</TD></TR>
                        <TR><TD isBold>Router</TD><TD>A device that broadcasts internet over Wi-Fi or LAN</TD></TR>
                        <TR><TD isBold>SSD (Solid State Drive)</TD><TD>A non-mechanical, flash-based storage device with fast access speeds</TD></TR>
                        <TR><TD isBold>Wired Internet (Ethernet)</TD><TD>A wired connection using an Ethernet cable to connect to the internet</TD></TR>
                        <TR><TD isBold>Wi-Fi</TD><TD>A wireless signal broadcasted by a router to connect to the internet</TD></TR>
                    </TBody>
                </Table>
            )
        },
        {
            title: 'Password Management',
            level: 'Intermediate',
            content: (
                <>
                    <P>Almost every website these days requires an account and some complicated string for a password. Keep in mind the following to keep them secure!</P>
                    <UL>
                        <li><span className="font-bold">Don't keep it simple!</span> The simpler a password is (such as "Password123"), the less secure the account is. Choose a word or sentence you can easily remember and mix in a few numbers or special characters in place of letters (ex: swap "e" for "3" or "a" for "@"). Salt your password with extra numbers or characters at the end for an added level of security.</li>
                        <li><span className="font-bold">Use a password manager!</span> Most web browsers have a built-in password manager, but a dedicated service is even more secure and usually includes a mobile app. Common ones include 1Password, Dashlane, KeePass, LastPass, and RoboForm. Keep in mind that these services can be breached, so a non-cloud option might be preferred.</li>
                        <li><span className="font-bold">Keep a physical copy in a binder!</span> Record your passwords on paper and keep it in a binder. You can create a table with columns for Account Name, User Name, Password, and Date Updated. Keep this binder in a very secure, discreet place, away from your computer.</li>
                        <li><span className="font-bold">Store a digital copy on a flash drive!</span> Use a spreadsheet program (like Google Sheets or Microsoft Excel) to create a similar table. Password protect this file and copy it to a flash drive. Make sure to delete the original file from your computer. Keep the flash drive in a secure, discreet place.</li>
                        <li><span className="font-bold">Be redundant!</span> Employ a few strategies above to have multiple secure copies of your passwords. Remember to keep them in sync when you change a password.</li>
                        <li><span className="font-bold">Make use of MFA!</span> Multi-factor authentication adds an extra layer of security. Even if it's tedious to set up, it's highly recommended. This can be a one-time password (OTP) texted to your phone or a temporary code from an authenticator app.</li>
                    </UL>
                </>
            )
        },
        {
            title: 'Tech Remote Assistance',
            level: 'Intermediate',
            content: (
                <>
                    <P>Getting tech assistance may be the most ideal in person but a close second is using Zoom to have a trusted technician remotely view and/or control your computer. You will have the ability to control your computer the entire time.</P>
                    <UL>
                        <li>Click the Zoom meeting link the technician provides.</li>
                        <li>On the pre-meeting screen, enable your mic and enter your name before hitting the "Join" button.</li>
                        <li>Click the "Share" button to start sharing your screen.</li>
                    </UL>
                </>
            )
        },
         {
            title: 'Digital Photo Frame',
            level: 'Intermediate',
            content: (
                <>
                    <P>Sharing family photos is easier and more popular now than ever before since we all have a great camera available at all times in our pocket!</P>
                    <UL>
                        <li><span className="font-bold">View photos from the cloud!</span> Skylight is an excellent cloud-based digital photo frame perfect for sending and viewing family photos. The process is simple: purchase a frame, connect to WiFi, pick a unique email address for your frame, and give your family this email address to send photos to.</li>
                        <li><span className="font-bold">Download the app for convenience!</span> Once you download the app, you'll have access to all photos sent to your frame. You can even organize them by album and choose which to display on the frame!</li>
                    </UL>
                </>
            )
        },
        // ADVANCED
        {
            title: 'Advanced Vocabulary',
            level: 'Advanced',
            content: (
                <Table>
                    <THead><TH>Word or Phrase</TH><TH>Definition</TH><TH>Examples</TH></THead>
                    <TBody>
                        <TR><TD isBold>AI (Artificial Intelligence)</TD><TD>A complex program using an LLM to generate human-like responses, code, pictures, etc.</TD><TD>ChatGPT, Gemini, Grok</TD></TR>
                        <TR><TD isBold>AR (Augmented Reality)</TD><TD>An experience using a head-mounted device that superimposes data in front of the user's eyes</TD><TD>Apple Vision Pro, Meta Quest</TD></TR>
                        <TR><TD isBold>Cloud Computing</TD><TD>Utilizing powerful servers in remote data warehouses to process large amounts of data</TD><TD>AWS, Azure, GCP</TD></TR>
                        <TR><TD isBold>DL (Deep Learning)</TD><TD>A subset of ML which focuses on learning by simulating human neural networks</TD><TD>Tesla Full Self-Driving</TD></TR>
                        <TR><TD isBold>IoT (Internet of Things)</TD><TD>A network of smart devices connected to the internet</TD><TD>Nest thermostat, Ring doorbell</TD></TR>
                        <TR><TD isBold>LLM (Large Language Model)</TD><TD>A deep learning model pre-trained on vast amounts of data</TD><TD>GPT, LLaMa, LaMDA</TD></TR>
                        <TR><TD isBold>ML (Machine Learning)</TD><TD>A branch of AI which focuses on using data and algorithms to learn and refine accuracy</TD><TD>Facial recognition</TD></TR>
                        <TR><TD isBold>OCR (Optical Character Recognition)</TD><TD>A technology that converts scanned or printed text into machine-readable data</TD><TD>Google Lens</TD></TR>
                        <TR><TD isBold>VR (Virtual Reality)</TD><TD>A simulated experience using a head-mounted device to fully immerse the user in a virtual world</TD><TD>Apple Vision Pro, Meta Quest</TD></TR>
                    </TBody>
                </Table>
            )
        },
        {
            title: 'Artificial Intelligence',
            level: 'Advanced',
            content: (
                <>
                    <H4>Generative Chatbots</H4>
                    <P>The below AI tools are interacted with via prompts: specifically worded queries to generate text or image responses and can be iteratively refined.</P>
                    <H4>Examples</H4>
                    <Table>
                        <THead><TH>AI</TH><TH>Prompt(s)</TH><TH>Final Output</TH></THead>
                        <TBody>
                            <TR><TD isBold>ChatGPT</TD><TD>"Tell me about the Gospels of the Bible"<br/>"Shorten that to summarize in 2 sentences"</TD><TD>[Text output summarizing the Gospels in two sentences]</TD></TR>
                            <TR><TD isBold>Copilot</TD><TD>"Generate a picture of the grand canyon full of plant life"</TD><TD>[Image of the Grand Canyon filled with lush greenery]</TD></TR>
                            <TR><TD isBold>Gemini</TD><TD>"Give me an itinerary on things to do in Rome"<br/>"Condense that to a single day"</TD><TD>[Text output of a one-day Rome itinerary]</TD></TR>
                            <TR><TD isBold>Grok</TD><TD>"Summarize the attempted assassination of Donald Trump in Butler"</TD><TD>[Text output summarizing the event]</TD></TR>
                        </TBody>
                    </Table>
                </>
            )
        },
        {
            title: 'Cloud Storage',
            level: 'Advanced',
            content: (
                <>
                    <P>While most of the major brands have a cloud service, none of them are locked to their own platform so you are free to use iCloud on Windows or Google Drive on iPhone.</P>
                     <Table>
                        <THead><TH>Cloud Service</TH><TH>Brand</TH><TH>Desktop Client</TH><TH>Mobile App</TH><TH>Free Tier</TH></THead>
                        <TBody>
                            <TR><TD isBold>iCloud</TD><TD>Apple</TD><TD>Windows<br/>macOS</TD><TD>iPhone<br/>Android</TD><TD>5GB</TD></TR>
                            <TR><TD isBold>OneDrive</TD><TD>Microsoft</TD><TD>Windows<br/>macOS</TD><TD>iPhone<br/>Android</TD><TD>5GB</TD></TR>
                            <TR><TD isBold>Google Drive</TD><TD>Google</TD><TD>Windows<br/>macOS</TD><TD>iPhone<br/>Android</TD><TD>15GB</TD></TR>
                            <TR><TD isBold>iDrive</TD><TD>Agnostic</TD><TD>Windows<br/>macOS</TD><TD>iPhone<br/>Android</TD><TD>10GB</TD></TR>
                            <TR><TD isBold>Dropbox</TD><TD>Agnostic</TD><TD>Windows<br/>macOS</TD><TD>iPhone<br/>Android</TD><TD>2GB</TD></TR>
                        </TBody>
                    </Table>
                </>
            )
        },
    ];

    const beginnerTopics = originalTechTopics.filter(t => t.level === 'Beginner');
    const intermediateTopics = originalTechTopics.filter(t => t.level === 'Intermediate');
    const advancedTopics = originalTechTopics.filter(t => t.level === 'Advanced');

    const Section = ({ title, topics }: { title: string, topics: typeof originalTechTopics }) => (
        <div className="space-y-6">
            <div className="py-4 bg-gray-100 rounded-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800">{title}</h2>
            </div>
            <div className="space-y-4">
                {topics.map(topic => (
                    <Accordion key={topic.title} title={topic.title}>
                        {topic.content}
                    </Accordion>
                ))}
            </div>
        </div>
    );

    return (
        <div className="space-y-12">
            <Section title="Beginner" topics={beginnerTopics} />
            <Section title="Intermediate" topics={intermediateTopics} />
            <Section title="Advanced" topics={advancedTopics} />
        </div>
    );
};

// Component for the new Computer content
const ComputerContent = () => {
    return (
        <div className="space-y-6">
            <div className="py-4 bg-gray-100 rounded-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800">Computer</h2>
            </div>
            <Accordion title="Software">
                <H4>Malware Removal</H4>
                <UL>
                    <li>Click here to download Malwarebytes (<A href="https://www.malwarebytes.com/">automatically detects Windows or Mac</A>)</li>
                    <li>Once downloaded (check Downloads folder), double click the MBSetup file (.exe for Windows and .dmg for Mac)</li>
                    <li>Follow on screen prompts to install Malwarebytes (you may need to enable full access on MacOS or run as admin on Windows)</li>
                    <li>Open Malwarebytes if it doesn't automatically open</li>
                    <li>Click "Scan Now" button to scan your system for any malware</li>
                    <li>Quarantine any detected files once the scan is complete</li>
                </UL>
                <Note>Symptoms of malware (such as viruses and trojans) include random pop-ups, slow loading, phishing emails requesting to change password, compromised accounts, and fraulent transactions.</Note>
                
                <H4>Installing Apps (macOS)</H4>
                <P>Navigate to the APP STORE that is logged in with your Apple ID</P>
                <UL>
                    <li>Search for the desired app</li>
                    <li>Select the app in the results and click Install</li>
                </UL>
                <P>OR</P>
                <UL>
                    <li>Navigate to the website to find the desired app</li>
                    <li>Once downloaded, click the .dmg installer on the desktop to install</li>
                </UL>

                <H4>Installing Programs (Windows)</H4>
                <P>Navigate to the MICROSOFT STORE that is logged in with your Microsoft Account</P>
                <UL>
                    <li>Search for the desired app</li>
                    <li>Select the app in the results and click Install</li>
                </UL>
                <P>OR</P>
                <UL>
                    <li>Navigate to the website to find the desired program</li>
                    <li>Once downloaded, click the .exe installer to install</li>
                </UL>

                <H4>Useful Keyboard Shortcuts</H4>
                <Table>
                    <THead><TH>Action</TH><TH>Windows</TH><TH>macOS</TH></THead>
                    <TBody>
                        <TR><TD>Select All</TD><TD>ctrl+a</TD><TD>cmd+a</TD></TR>
                        <TR><TD>Copy Selection</TD><TD>ctrl+c</TD><TD>cmd+c</TD></TR>
                        <TR><TD>Cut Selection</TD><TD>ctrl+x</TD><TD>cmd+x</TD></TR>
                        <TR><TD>Paste Selection</TD><TD>ctrl+v</TD><TD>cmd+v</TD></TR>
                        <TR><TD>Undo</TD><TD>ctrl+z</TD><TD>cmd+z</TD></TR>
                        <TR><TD>Redo</TD><TD>ctrl+y</TD><TD>cmd+y / cmd+shift+z</TD></TR>
                        <TR><TD>Print</TD><TD>ctrl+p</TD><TD>cmd+p</TD></TR>
                        <TR><TD>Reset GPU</TD><TD>win+ctrl+shift+b</TD><TD>N/A</TD></TR>
                        <TR><TD>Task Monitor</TD><TD>ctrl+shift+esc</TD><TD>cmd+option+esc</TD></TR>
                        <TR><TD>Screen Snip</TD><TD>win+shift+s</TD><TD>cmd+shift+4</TD></TR>
                        <TR><TD>Screen Shot</TD><TD>print screen</TD><TD>cmd+shift+3</TD></TR>
                    </TBody>
                </Table>

                <H4>Remote Desktop Access</H4>
                <UL>
                    <li>Install VNC Server (Windows, macOS, and Linux compatible) on the computer you want to remotely access</li>
                    <li>Create a RealVNC account and login to VNC Server</li>
                    <li>Add the computer to your RealVNC address book as a cloud connection</li>
                    <li>Install VNC Viewer (desktop client or app) on the device you want to remotely connect from</li>
                    <li>Login to your RealVNC account in VNC Viewer</li>
                    <li>Open VNC Viewer and select the computer to remotely access</li>
                </UL>

                <H4>Photo Sharing</H4>
                <UL>
                    <li>Login to Google Drive with your Google Account or create one if necessary</li>
                    <li>Navigate to My Drive on the left side panel</li>
                    <li>Open up Finder (macOS) or Windows Explorer (Windows) and find the photos you'd like to share</li>
                    <li>Drag and drop the folder or picture files from Finder or Windows Explorer into My Drive</li>
                    <li>Right click the folder or picture files and hover over Share in the context menu</li>
                    <li>Select Copy Link to copy the picture URL to share or select Share to choose an account to share to</li>
                </UL>
            </Accordion>
            
            <Accordion title="Hardware">
                <H4>Printers</H4>
                <Table>
                    <THead><TH>Brand</TH><TH>Support</TH><TH>Drivers</TH></THead>
                    <TBody>
                        <TR><TD isBold>Brother</TD><TD><A href="https://www.brother-usa.com/support">Link</A></TD><TD><A href="https://www.brother-usa.com/support/drivers">Link</A></TD></TR>
                        <TR><TD isBold>HP</TD><TD><A href="https://support.hp.com/">Link</A></TD><TD><A href="https://support.hp.com/us-en/drivers">Link</A></TD></TR>
                        <TR><TD isBold>Epson</TD><TD><A href="https://epson.com/Support/sl/s">Link</A></TD><TD><A href="https://epson.com/support/drivers-and-downloads">Link</A></TD></TR>
                        <TR><TD isBold>Canon</TD><TD><A href="https://www.usa.canon.com/support">Link</A></TD><TD><A href="https://www.usa.canon.com/support/drivers-downloads">Link</A></TD></TR>
                    </TBody>
                </Table>
                <UL>
                    <li><span className="font-bold">Print with a cable.</span> Depending on your computer's OS, plugging in a printer with a USB Type-B cable (see below Common Inputs tip) to your computer may be enough to use your printer. Otherwise, you'll have to download drivers using the above links for your printer's brand.</li>
                    <li><span className="font-bold">Print wirelessly!</span> This setup is a little more involved and drivers and printer utilities have to be installed based on your specific printer model. Use the above links to navigate to your printer brand's website to download them. You may have to connect your printer to your home network by navigating the printer's interface as well.</li>
                </UL>
                <Note>Printer model number/names are usually found on a sticker on the back of the printer or printed on the front. Navigate to your brand's website above and input the model number/name.</Note>

                <H4>Monitors</H4>
                <UL>
                    <li><span className="font-bold">Extend your desktop.</span> Both Windows and macOS include support for a multi-monitor setup. If your laptop or desktop has extra display ports (see Common Inputs below for visual aide), connect the proper cable to your monitor and your computer. Depending on the OS, extra configuration may be required to correctly detect the new monitor and arrange it properly in Display settings for Windows and System Preferences for macOS.</li>
                    <li><span className="font-bold">Refresh your monitor.</span> Modern day monitors have at least a 60hz refresh rate which means the screen refreshes 60 times per second. Simply put, the higher the refresh rate, the smoother the experience is. This makes for a more pleasant experience when viewing high framerate videos and playing games. The refresh rate of your monitor can be found in Advanced display settings in Windows and System Preferences in macOS. Sometimes the refresh rate needs to be toggled in the monitor's OSD (on-screen display) menu as well, using the monitor's physical buttons.</li>
                </UL>

                <H4>Common Inputs</H4>
                <P>A myriad of devices can be connected to a computer although modern laptops usually need the aid of a USB Type-C dock or adapter to provide access to more common ports.</P>
                <Table>
                    <THead><TH>Input</TH><TH>Example Devices</TH></THead>
                    <TBody>
                        <TR><TD>USB Type-A</TD><TD>Keyboard, Mouse</TD></TR>
                        <TR><TD>USB Type-B</TD><TD>Printer</TD></TR>
                        <TR><TD>USB Type-C</TD><TD>Dock, Flash drive, Phone cable</TD></TR>
                        <TR><TD>HDMI</TD><TD>Monitor</TD></TR>
                        <TR><TD>DisplayPort</TD><TD>Monitor</TD></TR>
                        <TR><TD>DVI</TD><TD>Monitor</TD></TR>
                        <TR><TD>VGA</TD><TD>Monitor</TD></TR>
                        <TR><TD>Ethernet / RJ45</TD><TD>Router</TD></TR>
                    </TBody>
                </Table>
                <Note>Colors of ports may vary slightly based on port version. Size roughly to scale.</Note>

                <H4>Drive Formatting</H4>
                <UL>
                    <li>Connect the drive via USB to your laptop/desktop computer</li>
                    <li>In macOS, open Disk Utility or Windows, open Windows Explorer</li>
                    <li>Find the drive in the side panel on the left and select it</li>
                    <li>Click the Format option and specify a format type</li>
                    <li>NTFS (Windows), APFS (macOS), FAT32(4GB file size limit)/exFAT (cross platform)</li>
                </UL>
                <Note>Use caution when formatting as ALL drive contents will be erased!</Note>

                <H4>Local Backup</H4>
                <P>In case of hardware failure, it is highly advised to keep a backup of your files locally.</P>
                <P>Full system backups and manual backups are options for any platform. For quick read/write speeds and durability, it is recommended to use an SSD as an external drive but HDDs are the more cost efficient option for mass storage.</P>
                <UL>
                    <li><span className="font-bold">Use a utility program to keep full system backups.</span> macOS has a built-in utility called Time Machine that allows you to use an entire external drive as a Time Machine Backup and can periodically perform a backup automatically for you based on configuration. For Windows users, there's a number of options available, most of them paid. The top free one is fbackup.</li>
                    <li><span className="font-bold">Drag and drop files onto an external drive for manual backups.</span> Ensure that the drive is properly formatted for your OS using the above tip and connect it your computer via USB. Once detected, you can essentially treat the drive just like you would the built-in drive as it should show up similarly under drives connected. Try to stay organized and create concise and succinct folder names to hold any important files you'd like to keep as a backup. Copy (not cut) files from your computer's drive and paste them onto the external drive. Alternatively, you can drag and drop files easily if you have 2 file explorer windows open.</li>
                </UL>
            </Accordion>
        </div>
    );
};

const SmartphoneContent = () => (
    <div className="space-y-6">
        <div className="py-4 bg-gray-100 rounded-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800">Smartphone</h2>
        </div>
        <Accordion title="Connections">
            <H4>Choosing a Carrier</H4>
            <P>Keep in mind the following when browsing around for a mobile carrier:</P>
            <Table>
                <THead><TH>Phrase</TH><TH>Definition</TH><TH>Usage</TH></THead>
                <TBody>
                    <TR><TD>Coverage</TD><TD>The geographical area where a carrier provides service</TD><TD>Urban vs rural areas</TD></TR>
                    <TR><TD>Data Cap</TD><TD>The amount of data provided per billing cycle, measured in gigabytes (GB)</TD><TD>Unlimited vs limited data</TD></TR>
                    <TR><TD>eSIM</TD><TD>A digital SIM card enabling alternate carriers and data plans on one device</TD><TD>Multiple phone plans</TD></TR>
                    <TR><TD>MVNO</TD><TD>Mobile Virtual Network Operator, leases network capacity from other carriers</TD><TD>Alternative carriers</TD></TR>
                    <TR><TD>Network Technology</TD><TD>The type of network used, such as 4G LTE or 5G, affecting speed and performance</TD><TD>5G for faster speeds</TD></TR>
                    <TR><TD>Roaming Charges</TD><TD>Additional costs incurred when using the phone outside a carrier's network</TD><TD>International travel</TD></TR>
                    <TR><TD>SIM</TD><TD>A small card inserted into the phone, storing phone plan data and phone number</TD><TD>Required for cellular connectivity</TD></TR>
                    <TR><TD>Throttling</TD><TD>Reduced download and upload speeds after a certain amount of data has been used</TD><TD>Data-intensive activities</TD></TR>
                </TBody>
            </Table>

            <H4>Big Carriers</H4>
            <UL><li>AT&T</li><li>T-Mobile</li><li>Verizon</li></UL>
            
            <H4>Alternative Carriers</H4>
            <UL>
                <li>Boost Mobile</li><li>Mint Mobile</li><li>Pure Talk</li><li>US Cellular</li>
                <li>Consumer Cellular</li><li>Cricket Wireless</li><li>Patriot Mobile</li>
                <li>Straight Talk</li><li>US Mobile</li>
            </UL>
            <Note>Check carrier coverage in your area before committing to a plan. Alternative carriers also utilize big carrier networks.</Note>

            <H4>Personal Hotspot</H4>
            <UL>
                <li>Open the Settings app</li>
                <li>Enable Personal Hotspot (iPhone) or Mobile Hotspot (Android)</li>
                <li>Configure the password for the hotspot</li>
                <li>On your separate device, view Wi-Fi networks</li>
                <li>Connect to the hotspot (phone name) and enter the password configured</li>
            </UL>
            <Note>Verify that your phone plan allows for hotspot usage. Some plans differentiate cell data and hotspot data.</Note>
        </Accordion>
        <Accordion title="iPhone">
            <H4>Photo Editing</H4>
            <UL>
                <li>Open the Photos app</li>
                <li>Select the photo you'd like to edit</li>
                <li>Tap share icon at the bottom</li>
                <li>Swipe through the setting circles on the bottom and use the slider to modify</li>
                <li>Tap filters at the bottom to select a filter</li>
                <li>Tap crop to trim the photo down to size by dragging the corners</li>
            </UL>

            <H4>Shared Photo Album</H4>
            <UL>
                <li>Open the Photos app</li>
                <li>Select the photo(s) you'd like to share</li>
                <li>Tap share icon in bottom left corner</li>
                <li>Tap the Add to Shared Album button in list</li>
                <li>Type a comment to add (optional)</li>
                <li>Tap Shared Album to select a pre-existing album or create a new one</li>
            </UL>
            <Note>The above feature is available in iOS 16 and later.</Note>

            <H4>Analyze Text in Picture</H4>
            <UL>
                <li>Open the Camera app</li>
                <li>Take a picture of a subject with text</li>
                <li>Bring up that recently captured photo</li>
                <li>Tap scan text icon in the bottom right corner</li>
                <li>Links to websites will appear at the bottom and text can be highlighted and copied</li>
            </UL>
            <Note>The above feature is available in iOS 15 and later.</Note>

            <H4>FaceTime Screen Sharing</H4>
            <UL>
                <li>Open the FaceTime app</li>
                <li>Choose a contact to initiate a FaceTime Audio or Video</li>
                <li>After the call connects, tap scan text icon to start sharing your screen</li>
            </UL>
            <Note>The above feature is available for the latest iOS and may not be available on older versions.</Note>

            <H4>Flashlight Variable Brightness</H4>
            <UL>
                <li>Swipe down from top right corner of screen (or swipe up from bottom on iPhones with home button) to open Control Center</li>
                <li>Tap and hold on the flashlight button</li>
                <li>Drag the flashlight beam to raise or lower the level of brightness</li>
                <li>Enabling flashlight now defaults to that level of brightness</li>
            </UL>

            <H4>Timed Picture Capture</H4>
            <UL>
                <li>Open the Camera app</li>
                <li>Tap the up arrow button at the top center of the screen</li>
                <li>Slide the icons at the bottom and tap [Timer Icon]</li>
                <li>Choose from 3s, 5s or 10s</li>
                <li>Tap the shutter circle button</li>
            </UL>

            <H4>Change Background</H4>
            <UL>
                <li>Open the Settings app</li>
                <li>Scroll down and tap Wallpaper</li>
                <li>Tap Lockscreen or Homescreen and set photo</li>
            </UL>

            <H4>Change Passcode</H4>
            <UL>
                <li>Open the Settings app</li>
                <li>Scroll down and tap Face ID & Passcode</li>
                <li>Enter current passcode</li>
                <li>Scroll down and tap Change Passcode</li>
                <li>Enter new passcode</li>
            </UL>
        </Accordion>
        <Accordion title="Android">
            <H4>Photo Editing</H4>
            <UL>
                <li>Open your preferred app for photos (Google Photos or Gallery)</li>
                <li>Select the photo you'd like to edit</li>
                <li>Tap share icon or a similar icon at the bottom of the screen</li>
                <li>Swipe through the options on the bottom and use the slider to modify</li>
                <li>Crop to trim the photo down to size by dragging the corner dots</li>
            </UL>
            
            <H4>Shared Photo Album</H4>
            <UL>
                <li>Open the Google Photos app and login with a Google account</li>
                <li>Tap Collections on the left side pane</li>
                <li>Tap + in the top right corner</li>
                <li>Tap Album in the Create new list</li>
                <li>Name the album in the Add a title field</li>
                <li>Tap + Select photos</li>
                <li>Tap the photo(s) to add to the album and hit Add in the top right corner</li>
                <li>Tap the check mark in the top left corner</li>
                <li>Tap share icon at the bottom of the screen</li>
                <li>Tap Get link and Create link which will be copied to the clipboard</li>
                <li>Share this link of the shared album with your contacts</li>
            </UL>

            <H4>Analyze Text in Picture</H4>
            <UL>
                <li>Open the Google Lens app</li>
                <li>Point your camera at text to analyze and tap Select text</li>
                <li>Text will now be highlighted and can be copied or Google searched</li>
            </UL>

            <H4>Flashlight Variable Brightness</H4>
            <UL>
                <li>Swipe down from top right corner of screen to open Quick Settings</li>
                <li>Tap and hold on the flashlight button</li>
                <li>Drag the slider to raise or lower the level of brightness</li>
                <li>Enabling flashlight now defaults to that level of brightness</li>
            </UL>
            
            <H4>Timed Picture Capture</H4>
            <UL>
                <li>Open the Camera app</li>
                <li>Tap [Timer Icon] at the top</li>
                <li>Choose from 2s, 5s or 10s</li>
                <li>Tap the shutter circle button</li>
            </UL>

            <H4>Change Background</H4>
            <UL>
                <li>Open the Settings app</li>
                <li>Scroll down and tap Wallpaper and style</li>
                <li>Tap the lockscreen or homescreen</li>
                <li>Tap Wallpapers in the top left corner</li>
                <li>Select a photo from the categories</li>
            </UL>

            <H4>Change Lock Type</H4>
            <UL>
                <li>Open the Settings app</li>
                <li>Scroll down and tap Lockscreen</li>
                <li>Tap Screen lock type</li>
                <li>Choose a new lock type and enter on-screen prompts</li>
            </UL>
        </Accordion>
    </div>
);

const SearchFeature = ({ title, placeholder }: { title: string, placeholder: string }) => {
  const [query, setQuery] = useState('');
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    alert(`Search functionality for "${query}" requires a backend API connection and is not implemented in this demo.`);
  };

  return (
    <div className="mb-4">
      <h5 className="font-semibold text-lg mb-2 text-gray-800">{title}</h5>
      <form onSubmit={handleSearch} className="flex gap-2">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-grow p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
          aria-label={title}
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400" disabled={!query.trim()}>
          Search
        </button>
      </form>
    </div>
  );
};

const MovieList = ({ title, movies }: { title: string, movies: string[] }) => (
  <div className="mt-6">
    <h4 className="text-xl font-semibold text-gray-800 mb-3">{title}</h4>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {movies.map(movie => (
        <div key={movie} className="p-3 bg-gray-100 rounded-lg text-sm text-center flex items-center justify-center">
          {movie}
        </div>
      ))}
    </div>
    <p className="text-xs text-gray-500 text-right mt-2">Data provided by TMDB</p>
  </div>
);

const StreamingContent = () => {
    const nowPlayingMovies = ["Together", "The Bad Guys 2", "KPop Demon Hunters", "Weapons", "Osiris", "Red Sonja", "Hostile Takeover", "The Thursday Murder Club", "The Fantastic 4: First Steps", "Ne Zha 2", "The Home", "The Shadow's Edge", "Sketch", "Descendent", "Freakier Friday", "Night Always Comes", "Nobody 2", "Shaman", "Happy Gilmore 2", "Caught Stealing"];
    const upcomingMovies = ["Demon Slayer: Kimetsu no Yaiba Infinity Castle", "The Conjuring: Last Rites", "Toy Story", "The Long Walk", "The Sound of Music", "The Legend of Hei 2", "Apollo 13", "Downton Abbey: The Grand Finale", "Splitsville", "Hamilton", "HIMA Big Bold Beautiful Journey", "Nishaanchi", "Light of the World", "Waltzing with Brando", "The Glassworker", "Lurker", "Xeno", "Queen of Manhattan", "Dreams (Sex Love)"];

    return (
        <div className="space-y-6">
            <div className="py-4 bg-gray-100 rounded-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800">Streaming</h2>
            </div>
            <Accordion title="Software">
                <H4>Streaming Services</H4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    <div>
                        <h5 className="font-semibold text-lg mb-2 text-gray-800">Big Media</h5>
                        <UL>
                            <li>Youtube / Youtube TV</li> <li>Netflix / Prime Video</li> <li>HBO Max / Hulu</li> <li>Peacock / Disney+</li> <li>Paramount+ / Discovery+</li> <li>Apple TV+ / ESPN+</li>
                        </UL>
                    </div>
                    <div>
                        <h5 className="font-semibold text-lg mb-2 text-gray-800">Alternative Media</h5>
                        <UL>
                            <li>PureFlix / Cue</li> <li>Yippee / Redeem TV</li> <li>Christian Cinema / RightNow Media</li> <li>Rumble / Brighteon</li>
                        </UL>
                    </div>
                </div>
            </Accordion>
            <Accordion title="Hardware">
                <H4>Streaming Devices</H4>
                <UL>
                    <li>Amazon Fire TV Stick</li> <li>Roku</li> <li>Chromecast</li> <li>Apple TV</li>
                </UL>
            </Accordion>
            <Accordion title="Movies and Shows">
                <SearchFeature title="Movie Search" placeholder="Enter movie name..." />
                <SearchFeature title="Show Search" placeholder="Enter show name..." />
                <SearchFeature title="Director Search" placeholder="Enter director name..." />
                <SearchFeature title="Actor Search" placeholder="Enter actor name..." />
                <MovieList title="Now Playing" movies={nowPlayingMovies} />
                <MovieList title="Upcoming" movies={upcomingMovies} />
            </Accordion>
            <Accordion title="Music">
                <SearchFeature title="Artist Search" placeholder="Enter artist name..." />
                <SearchFeature title="Album Search" placeholder="Enter album name..." />
                <SearchFeature title="Song Search" placeholder="Enter song name..." />
            </Accordion>
            <Accordion title="Podcasts">
                <SearchFeature title="Podcast Search" placeholder="Enter podcast name..." />
            </Accordion>
        </div>
    );
};

const TelevisionContent = () => (
    <div className="space-y-6">
        <div className="py-4 bg-gray-100 rounded-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800">Television</h2>
        </div>
        <Accordion title="Hardware">
            <H4>Display Types</H4>
            <UL>
                <li><span className="font-bold">LCD/LED:</span> The most common type, offering good brightness and value.</li>
                <li><span className="font-bold">OLED:</span> Offers perfect black levels and vibrant colors, great for movies.</li>
                <li><span className="font-bold">QLED:</span> An enhancement of LCD/LED with better brightness and color, good for bright rooms.</li>
            </UL>
            <H4>Cables</H4>
            <P>Ensure you're using a high-quality HDMI cable for the best picture and sound. For 4K TVs, use a cable rated for "High-Speed" or "Premium High-Speed".</P>
        </Accordion>
        <Accordion title="Troubleshooting">
            <H4>No Picture or Sound</H4>
            <UL>
                <li>Check that the TV is plugged in and turned on.</li>
                <li>Verify the correct input source (e.g., HDMI 1, HDMI 2) is selected.</li>
                <li>Try a different HDMI cable or a different device to rule out a faulty cable or source.</li>
            </UL>
            <H4>Poor Picture Quality</H4>
            <UL>
                <li>Adjust picture settings in the TV menu (brightness, contrast, sharpness).</li>
                <li>If streaming, check your internet speed. A slow connection can cause low-quality video.</li>
                <li>Ensure you are watching high-definition (HD) or 4K content when possible.</li>
            </UL>
        </Accordion>
    </div>
);

const GamingContent = () => (
    <div className="space-y-6">
        <div className="py-4 bg-gray-100 rounded-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800">Gaming</h2>
        </div>
        <Accordion title="Platforms">
            <H4>PC Gaming</H4>
            <P>Offers the most flexibility in hardware and a vast library of games through platforms like Steam, Epic Games Store, and GOG.</P>
            <H4>Consoles</H4>
            <P>PlayStation, Xbox, and Nintendo Switch offer a more streamlined, plug-and-play experience with exclusive titles for each platform.</P>
        </Accordion>
        <Accordion title="Common Issues">
            <H4>Lag or Low FPS (Frames Per Second)</H4>
            <UL>
                <li>On PC, lower the in-game graphics settings.</li>
                <li>Ensure your graphics card drivers are up to date.</li>
                <li>Close other applications running in the background.</li>
                <li>On console, ensure the console has proper ventilation and is not overheating.</li>
            </UL>
            <H4>Connectivity Problems</H4>
            <P>For online gaming, a wired ethernet connection is generally more stable than Wi-Fi. If you must use Wi-Fi, try to be as close to the router as possible.</P>
        </Accordion>
    </div>
);

const InternetContent = () => (
     <div className="space-y-6">
        <div className="py-4 bg-gray-100 rounded-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800">Internet</h2>
        </div>
        <Accordion title="Improving Wi-Fi Speed">
             <H4>Router Placement</H4>
             <P>Place your router in a central, open location in your home, away from walls and obstructions. Avoid placing it in basements or closets.</P>
             <H4>Restart Your Equipment</H4>
             <P>Regularly restarting your modem and router (at least once a month) can resolve many common connectivity issues. Unplug them, wait 30 seconds, and plug them back in.</P>
             <H4>Secure Your Network</H4>
             <P>Always use a strong, password-protected Wi-Fi network (WPA2 or WPA3 security). This prevents unauthorized users from slowing down your connection.</P>
        </Accordion>
         <Accordion title="Understanding Internet Speeds">
            <P>Internet speed is measured in megabits per second (Mbps). "Download speed" affects how quickly you can get data from the internet (like streaming movies), while "upload speed" affects how quickly you can send data (like posting photos).</P>
            <UL>
                <li><span className="font-bold">10-25 Mbps:</span> Good for basic browsing, email, and streaming in HD on one device.</li>
                <li><span className="font-bold">50-100 Mbps:</span> Excellent for multiple users, streaming in 4K, and online gaming.</li>
                <li><span className="font-bold">200+ Mbps:</span> Ideal for large households with many devices, heavy 4K streaming, and downloading large files quickly.</li>
            </UL>
         </Accordion>
    </div>
);

const WearableContent = () => (
    <div className="space-y-6">
        <div className="py-4 bg-gray-100 rounded-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800">Wearable</h2>
        </div>
        <Accordion title="Smartwatches (Apple Watch, Galaxy Watch)">
            <H4>Pairing with Your Phone</H4>
            <P>Ensure Bluetooth is enabled on your phone. Follow the instructions in the watch's companion app (e.g., the Watch app on iPhone) to pair the device.</P>
            <H4>Battery Life Tips</H4>
            <UL>
                <li>Lower the screen brightness.</li>
                <li>Disable the "always-on display" feature if available.</li>
                <li>Turn off notifications for apps you don't need alerts from.</li>
            </UL>
        </Accordion>
        <Accordion title="Fitness Trackers (Fitbit, Garmin)">
            <H4>Syncing Issues</H4>
            <P>If your tracker isn't syncing with its app, try restarting both the tracker and your phone's Bluetooth. Make sure the tracker's app is running in the background on your phone.</P>
            <H4>Cleaning</H4>
            <P>Clean the band and the sensor area on the back of the tracker regularly with a soft, lint-free cloth to ensure accurate heart rate readings and prevent skin irritation.</P>
        </Accordion>
    </div>
);

const AboutContent = () => (
    <div className="space-y-6">
        <div className="py-4 bg-gray-100 rounded-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800">About Tech Compass</h2>
        </div>
        <div className="p-6 bg-white rounded-xl space-y-4">
            <P>Welcome to Tech Compass, your AI-powered ally for navigating the complexities of modern technology. Our mission is to provide clear, accessible, and effective solutions to your everyday tech problems.</P>
            <P>This application combines two powerful approaches to tech support:</P>
            <UL>
                <li><span className="font-bold">AI Troubleshooter:</span> Leveraging the advanced capabilities of Google's Gemini model, our troubleshooter can analyze your screen to provide personalized, step-by-step guidance tailored to your specific issue.</li>
                <li><span className="font-bold">Learning Center:</span> A comprehensive library of self-help articles designed to empower you with knowledge. From basic vocabulary to advanced topics, our guides are here to help you learn and solve problems at your own pace.</li>
            </UL>
            <P>Whether you need immediate, interactive help or prefer to learn and explore on your own, Tech Compass is here to guide you.</P>
        </div>
    </div>
);

const PlaceholderContent = ({ topic }: { topic: string }) => (
    <div className="p-8 bg-white rounded-xl shadow-lg text-center h-full flex flex-col justify-center border">
        <h2 className="text-2xl font-bold text-gray-900">Content for {topic}</h2>
        <p className="mt-2 text-gray-500">This section is coming soon. Please check back later!</p>
    </div>
);


const topics = [
    'General Guides', 'Computer', 'Television', 'Gaming', 'Internet', 
    'Smartphone', 'Streaming', 'Wearable', 'Appointment', 'About'
];

const Tech101Screen: React.FC = () => {
    const [activeTopic, setActiveTopic] = useState('General Guides');

    const renderContent = () => {
        switch(activeTopic) {
            case 'General Guides': return <Tech101OriginalContent />;
            case 'Computer': return <ComputerContent />;
            case 'Television': return <TelevisionContent />;
            case 'Gaming': return <GamingContent />;
            case 'Internet': return <InternetContent />;
            case 'Smartphone': return <SmartphoneContent />;
            case 'Streaming': return <StreamingContent />;
            case 'Wearable': return <WearableContent />;
            case 'About': return <AboutContent />;
            case 'Appointment':
            default:
                return <PlaceholderContent topic={activeTopic} />;
        }
    };

    return (
        <div className="max-w-7xl mx-auto w-full">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
                  Learning Center
                </h1>
                <p className="text-lg text-gray-600">
                  Your library of easy-to-follow guides and tutorials.
                </p>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
                <nav className="md:w-1/5 lg:w-1/4">
                    <ul className="space-y-2 sticky top-24">
                        {topics.map(topic => (
                            <li key={topic}>
                                <button 
                                    onClick={() => setActiveTopic(topic)}
                                    className={`w-full text-left px-4 py-2 rounded-lg font-semibold transition-colors ${
                                        activeTopic === topic 
                                        ? 'bg-blue-600 text-white shadow' 
                                        : 'bg-transparent text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    {topic}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="md:w-4/5 lg:w-3/4">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Tech101Screen;
