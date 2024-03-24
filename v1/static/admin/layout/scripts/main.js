const toggleFragment= (element) => {
	document.querySelector('div.fragment-controller.active').classList.remove('active');
	document.querySelector('div.fragment.active').classList.remove('active');

	element.classList.add('active');
	document.querySelector(`div.fragment#${element.id}`).classList.add('active');

}

const toggleCollapsable = (element) => {
	console.log(element);
	element.parentElement.classList.toggle('active');
}

let globalContent, layoutData;
const pageInit= (props) => {
	globalContent= props.globalContent
	layoutData= props.layoutData

	contentInit();;
}

const contentSchema= [
	{
		collapsableId: 'home-page',
		tags: [
			{
				labelTitle: "Home - Entry: Message",
				tag: "homeEntryMsg"
			},
			{
				labelTitle: "Home - Values: Section Title",
				tag: "homeValuesSectionTitle"
			},{
				labelTitle: "Home - Values: Section Bio",
				tag: "homeValuesSectionBio"
			},{
				labelTitle: "Home - Values: Section Value One",
				tag: "homeValuesSectionValesOne"
			},{
				labelTitle: "Home - Values: Section Value Two",
				tag: "homeValuesSectionValesTwo"
			},{
				labelTitle: "Home - Values: Section Value Three",
				tag: "homeValuesSectionValesThree"
			},{
				labelTitle: "Home - Services: Section Title",
				tag: "homeServicesSectionTitle"
			},{
				labelTitle: "Home - Services: Section Bio",
				tag: "homeServicesSectionBio"
			},{
				labelTitle: "Home - Serivce: Installations Title",
				tag: "homeSerivceInstallationsTitle"
			},{
				labelTitle: "Home - Serivce: Installations Bio",
				tag: "homeSerivceInstallationsBio"
			},{
				labelTitle: "Home - Serivce: Modernization Title",
				tag: "homeSerivceModernizationTitle"
			},{
				labelTitle: "Home - Serivce: Modernization Bio",
				tag: "homeSerivceModernizationBio"
			},{
				labelTitle: "Home - Serivce: Maintenance Title",
				tag: "homeSerivceMaintenanceTitle"
			},{
				labelTitle: "Home - Serivce: Maintenance Bio",
				tag: "homeSerivceMaintenanceBio"
			},{
				labelTitle: "Home - Serivce: SpareParts Title",
				tag: "homeSerivceSparePartsTitle"
			},{
				labelTitle: "Home - Serivce: SpareParts Bio",
				tag: "homeSerivceSparePartsBio"
			},{
				labelTitle: "Home - Blog: Section Title",
				tag: "homeBlogSectionTitle"
			},{
				labelTitle: "Home - Testmonials: Section Title",
				tag: "homeTestmonialsSectionTitle"
			},{
				labelTitle: "Home - Testmonials: Section Bio",
				tag: "homeTestmonialsSectionBio"
			},{
				labelTitle: "Home - Project Management: Section Title",
				tag: "homeProjectManagementSectionTitle"
			},{
				labelTitle: "Home - Project Management: Section Bio",
				tag: "homeProjectManagementSectionBio"
			},
		],
	},
	{
		collapsableId: 'installations-page',
		tags: [
			{
				labelTitle: "Installations - Entry: Title",
				tag: "installationsEntryTitle"
			},
			{
				labelTitle: "Installations - Entry: Subtitle",
				tag: "installationsEntrySubtitle"
			},
			{
				labelTitle: "Installations - We Serve: Title",
				tag: "installationsWeServe"
			},
			{
				labelTitle: "Installations - WeServe: Subtitle",
				tag: "installationsWeServeSubtitle"
			},
			{
				labelTitle: "Installations - We Serve: Residential Buildings Title",
				tag: "installationsWeServeResidentialBuildings"
			},
			{
				labelTitle: "Installations - WeServe: Residential Buildings Description",
				tag: "installationsWeServeResidentialBuildingsDescription"
			},
			{
				labelTitle: "Installations - WeServe: Shopping Malls",
				tag: "installationsWeServeShoppingMalls"
			},
			{
				labelTitle: "Installations - WeServe: Shopping Malls Description",
				tag: "installationsWeServeShoppingMallsDescription"
			},
			{
				labelTitle: "Installations - WeServe: Hotels",
				tag: "installationsWeServeHotels"
			},
			{
				labelTitle: "Installations - WeServe: Hotels Description",
				tag: "installationsWeServeHotelsDescription"
			},
			{
				labelTitle: "Installations - WeServe: Office Buildings",
				tag: "installationsWeServeOfficeBuildings"
			},
			{
				labelTitle: "Installations - WeServe: Office Buildings Description",
				tag: "installationsWeServeOfficeBuildingsDescription"
			},
			{
				labelTitle: "Installations - All Type Of Installations: Title",
				tag: "installationsAllTypeOfInstallationsTitle"
			},
			{
				labelTitle: "Installations - All Type Of Installations: Subtitle",
				tag: "installationsAllTypeOfInstallationsSubtitle"
			},
			{
				labelTitle: "Installations - All Type Of Installations: Technologies",
				tag: "installationsAllTypeOfInstallationsTechnologies"
			},
			{
				labelTitle: "Installations - All Type Of Installations: Technologies Bio",
				tag: "installationsAllTypeOfInstallationsTechnologiesBio"
			},
			{
				labelTitle: "Installations - All Type Of Installations: Sourcing",
				tag: "installationsAllTypeOfInstallationsSourcing"
			},
			{
				labelTitle: "Installations - All Type Of Installations: Sourcing Bio",
				tag: "installationsAllTypeOfInstallationsSourcingBio"
			},
			{
				labelTitle: "Installations - All Type Of Installations: Loads",
				tag: "installationsAllTypeOfInstallationsLoads"
			},
			{
				labelTitle: "Installations - All Type Of Installations: Loads Bio",
				tag: "installationsAllTypeOfInstallationsLoadsBio"
			},
			{
				labelTitle: "Installations - All Type Of Installations: Speeds",
				tag: "installationsAllTypeOfInstallationsSpeeds"
			},
			{
				labelTitle: "Installations - All Type Of Installations: Speeds Bio",
				tag: "installationsAllTypeOfInstallationsSpeedsBio"
			},
			{
				labelTitle: "Installations - All Type Of Installations: Heights",
				tag: "installationsAllTypeOfInstallationsHeights"
			},
			{
				labelTitle: "Installations - All Type Of Installations: Heights Bio",
				tag: "installationsAllTypeOfInstallationsHeightsBio"
			},
			{
				labelTitle: "Installations - Geared: Section Title",
				tag: "installationsGearedSectionTitle"
			},
			{
				labelTitle: "Installations - Geared: Section Subtitle",
				tag: "installationsGearedSectionSubtitle"
			},
			{
				labelTitle: "Installations - Geared: Section Stops Label",
				tag: "installationsGearedSectionStopsLabel"
			},
			{
				labelTitle: "Installations - Geared: Section People Label",
				tag: "installationsGearedSectionPeopleLabel"
			},
			{
				labelTitle: "Installations - Geared: Section Speed Label",
				tag: "installationsGearedSectionSpeedLabel"
			},
			{
				labelTitle: "Installations - Gearless: Section Title",
				tag: "installationsGearlessSectionTitle"
			},
			{
				labelTitle: "Installations - Gearless: Section Subtitle",
				tag: "installationsGearlessSectionSubtitle"
			},
			{
				labelTitle: "Installations - Gearless: Section Stops Label",
				tag: "installationsGearlessSectionStopsLabel"
			},
			{
				labelTitle: "Installations - Gearless: Section People Label",
				tag: "installationsGearlessSectionPeopleLabel"
			},
			{
				labelTitle: "Installations - Gearless: Section Speed Label",
				tag: "installationsGearlessSectionSpeedLabel"
			},
			{
				labelTitle: "Installations - Home Lifts: Section Title",
				tag: "installationsHomeLiftsSectionTitle"
			},
			{
				labelTitle: "Installations - Home Lifts: Section Subtitle",
				tag: "installationsHomeLiftsSectionSubtitle"
			},
			{
				labelTitle: "Installations - Home Lifts: Section Stops Label",
				tag: "installationsHomeLiftsSectionStopsLabel"
			},
			{
				labelTitle: "Installations - Home Lifts: Section People Label",
				tag: "installationsHomeLiftsSectionPeopleLabel"
			},
			{
				labelTitle: "Installations - Home Lifts: Section Speed Label",
				tag: "installationsHomeLiftsSectionSpeedLabel"
			},
		],
	},
	{
		collapsableId: "modernization-page",
		tags: [
			{
				labelTitle: "Modernization - Entry: Ttle",
				tag: "modernizationEntryTitle"
			},
			{
				labelTitle: "Modernization - Entry: Subtitle",
				tag: "modernizationEntrySubtitle"
			},
			{
				labelTitle: "Modernization - Machines: Title",
				tag: "modernizationMachinesTitle"
			},
			{
				labelTitle: "Modernization - Machines: Subtitle",
				tag: "modernizationMachinesSubtitle"
			},
			{
				labelTitle: "Modernization - Controllers: Title",
				tag: "modernizationControllersTitle"
			},
			{
				labelTitle: "Modernization - Controllers: Subtitle",
				tag: "modernizationControllersSubtitle"
			},
			{
				labelTitle: "Modernization - Doors: Title",
				tag: "modernizationDoorsTitle"
			},
			{
				labelTitle: "Modernization - Doors: Subtitle",
				tag: "modernizationDoorsSubtitle"
			},
			{
				labelTitle: "Modernization - Decorations: Title",
				tag: "modernizationDecorationsTitle"
			},
			{
				labelTitle: "Modernization - Decorations: Subtitle",
				tag: "modernizationDecorationsSubtitle"
			},
		],
	},
	{
		collapsableId: "maintenance-page",
		tags: [
			{
				labelTitle: "Maintenance - Entry: Title",
				tag: "maintenanceEntryTitle"
			},
			{
				labelTitle: "Maintenance - Entry: Subtitle",
				tag: "maintenanceEntrySubtitle"
			},
			{
				labelTitle: "Maintenance - Serivces: SectionTitle",
				tag: "maintenanceSerivcesSectionTitle"
			},
			{
				labelTitle: "Maintenance - Serivces: SectionSubtitle",
				tag: "maintenanceSerivcesSectionSubtitle"
			},
			{
				labelTitle: "Maintenance - Services: Card One Title",
				tag: "maintenanceServicesCardOneTitle"
			},
			{
				labelTitle: "Maintenance - Services: Card One Bio",
				tag: "maintenanceServicesCardOneBio"
			},
			{
				labelTitle: "Maintenance - Services: Card Two Title",
				tag: "maintenanceServicesCardTwoTitle"
			},
			{
				labelTitle: "Maintenance - Services: Card Two Bio",
				tag: "maintenanceServicesCardTwoBio"
			},
			{
				labelTitle: "Maintenance - Services: Card Three Title",
				tag: "maintenanceServicesCardThreeTitle"
			},
			{
				labelTitle: "Maintenance - Services: Card Three Bio",
				tag: "maintenanceServicesCardThreeBio"
			},
			{
				labelTitle: "Maintenance - Preventing Maintenance Title",
				tag: "maintenancePreventingMaintenanceTitle"
			},
			{
				labelTitle: "Maintenance - Preventing Maintenance Paragraph",
				tag: "maintenancePreventingMaintenanceParagraph"
			},
			{
				labelTitle: "Maintenance - Safety Title",
				tag: "maintenanceSafetyTitle"
			},
			{
				labelTitle: "Maintenance - Safety Paragraph",
				tag: "maintenanceSafetyParagraph"
			},
		],
	},
	{
		collapsableId: "about-page",
		tags: [
			{
				labelTitle: "About - Values: Section Title",
				tag: "aboutValuesSectionTitle"
			},
			{
				labelTitle: "About - Values: Section Subtitle",
				tag: "aboutValuesSectionSubtitle"
			},
			{
				labelTitle: "About - Values: Section Values One Title",
				tag: "aboutValuesSectionValuesOneTitle"
			},
			{
				labelTitle: "About - Values: Section Values One Desc",
				tag: "aboutValuesSectionValuesOneDesc"
			},
			{
				labelTitle: "About - Values: Section Values Two Title",
				tag: "aboutValuesSectionValuesTwoTitle"
			},
			{
				labelTitle: "About - Values: Section Values Two Desc",
				tag: "aboutValuesSectionValuesTwoDesc"
			},
			{
				labelTitle: "About - Values: Section Values Three Title",
				tag: "aboutValuesSectionValuesThreeTitle"
			},
			{
				labelTitle: "About - Values: Section Values Three Desc",
				tag: "aboutValuesSectionValuesThreeDesc"
			},
			{
				labelTitle: "About - Values: Section Values Four Title",
				tag: "aboutValuesSectionValuesFourTitle"
			},
			{
				labelTitle: "About - Values: Section Values Four Desc",
				tag: "aboutValuesSectionValuesFourDesc"
			},
			{
				labelTitle: "About - Values: Section Values Five Title",
				tag: "aboutValuesSectionValuesFiveTitle"
			},
			{
				labelTitle: "About - Values: Section Values Five Desc",
				tag: "aboutValuesSectionValuesFiveDesc"
			},
			{
				labelTitle: "About - Values: Section Values Six Title",
				tag: "aboutValuesSectionValuesSixTitle"
			},
			{
				labelTitle: "About - Values: Section Values Six Desc",
				tag: "aboutValuesSectionValuesSixDesc"
			},
			{
				labelTitle: "Meet Sky Founder Title",
				tag: "meetSkyFounderTile"
			},
			{
				labelTitle: "Meet Sky Founder Description",
				tag: "meetSkyFounderDescription"
			},
			{
				labelTitle: "Meet Sky Founder Degrees Title",
				tag: "meetSkyFounderDegreesTitle"
			},
			{
				labelTitle: "Meet Sky Founder Degrees",
				tag: "meetSkyFounderDegrees"
			},
			{
				labelTitle: "About Quality Codes Title",
				tag: "aboutQualityCodesTitle"
			},
			{
				labelTitle: "About Quality Codes Subtitle",
				tag: "aboutQualityCodesSubtitle"
			},
			{
				labelTitle: "About Quality Codes Snippet One",
				tag: "aboutQualityCodesSnippetOne"
			},
			{
				labelTitle: "About Quality Codes Snippet Two",
				tag: "aboutQualityCodesSnippetTwo"
			},
			{
				labelTitle: "About Quality Codes Snippet Three",
				tag: "aboutQualityCodesSnippetThree"
			},
			{
				labelTitle: "About Our Vision Title",
				tag: "aboutOurVisionTitle"
			},
			{
				labelTitle: "About Our Vision ",
				tag: "aboutOurVision"
			},
		],
	},	
]

const contentInit= ()=> {
	document.querySelector('#loading-overlay').style.display= 'flex';
	document.querySelector('#loading-dialog p').innerHTML= 'Usually, It takes from a minute to 5 minutes to prepare the edit form';
	document.querySelector('#loading-dialog').style.display= 'flex';
	setTimeout(()=> {

	for (section of contentSchema) {
		const container= document.querySelector(`#${section.collapsableId} .content`);
		for (let tag of section.tags) {
			container.innerHTML+= `
				<label>${tag.labelTitle}</label>
				<div class='row-fields' id='${tag.tag}'>
					<label>English</label>
					<label>Arabic</label>
					<textarea spellcheck="false" class='mutli-line-field en' placeholder='${tag.labelTitle}: English'>${globalContent['EN'][tag.tag] !== undefined ? globalContent['EN'][tag.tag]: ""}</textarea>
					<textarea spellcheck="false" class='mutli-line-field ar' placeholder='${tag.labelTitle}: Arabic'>${globalContent['AR'][tag.tag] !== undefined ? globalContent['AR'][tag.tag]: ""}</textarea>
				</div>
			`
		}

	}

	document.querySelector('textarea.en#short-desc').innerHTML= globalContent['EN']['shortDescription']
	document.querySelector('textarea.ar#short-desc').innerHTML= globalContent['AR']['shortDescription'] !== undefined ? globalContent['AR']['shortDescription'] : ""
	document.querySelector('input#facebook').value= layoutData.CONTACT['FACEBOOK']
	document.querySelector('input#instagram').value= layoutData.CONTACT['INSTAGRAM']
	document.querySelector('input#email').value= layoutData.CONTACT['EMAIL']
	document.querySelector('input#phone').value= layoutData.CONTACT['PHONE']
	document.querySelector('input#tiktok').value= layoutData.CONTACT['TIKTOK']
	document.querySelector('input#linkedin').value= layoutData.CONTACT['LINKEDIN']
	document.querySelector('input#twitter').value= layoutData.CONTACT['X-TWITTER']
	document.querySelector('input#founder-facebook').value= layoutData.CONTACT['FOUNDER_FACEBOOK']
	document.querySelector('input#founder-twitter').value= layoutData.CONTACT['FOUNDER_X-TWITTER']
	document.querySelector('input#founder-linkedin').value= layoutData.CONTACT['FOUNDER_LINKEDIN']

	document.querySelector('#loading-overlay').style.display= 'none';
	document.querySelector('#loading-dialog').style.display= 'none';
	// }, 10000);
	}, 100);
}

const contentUpdateSubmission= async ()=> {
	document.querySelector('#loading-overlay').style.display= 'flex';
	document.querySelector('#loading-dialog p').innerHTML= 'Usually, It takes from a minute to 10 minutes to edit the content of the website!';
	document.querySelector('#loading-dialog').style.display= 'flex';
	for (let section of contentSchema) {
		for (let tag of section.tags) {
			const fieldsContainer= document.querySelector(`.row-fields#${tag.tag}`)
			globalContent.EN[tag]= fieldsContainer.querySelector('textarea.en').value.trim();
			globalContent.AR[tag]= fieldsContainer.querySelector('textarea.ar').value.trim();
		}
	}

	globalContent['EN']['shortDescription']= document.querySelector('textarea.en#short-desc').innerHTML;
	globalContent['AR']['shortDescription']= document.querySelector('textarea.ar#short-desc').innerHTML;
	layoutData.CONTACT['FACEBOOK']= document.querySelector('input#facebook').value;
	layoutData.CONTACT['INSTAGRAM']= document.querySelector('input#instagram').value;
	layoutData.CONTACT['EMAIL']= document.querySelector('input#email').value;
	layoutData.CONTACT['PHONE']= document.querySelector('input#phone').value;
	layoutData.CONTACT['TIKTOK']= document.querySelector('input#tiktok').value;
	layoutData.CONTACT['LINKEDIN']= document.querySelector('input#linkedin').value;
	layoutData.CONTACT['X-TWITTER']= document.querySelector('input#twitter').value;
	layoutData.CONTACT['FOUNDER_FACEBOOK']= document.querySelector('input#founder-facebook').value;
	layoutData.CONTACT['FOUNDER_X-TWITTER']= document.querySelector('input#founder-twitter').value;
	layoutData.CONTACT['FOUNDER_LINKEDIN']= document.querySelector('input#founder-linkedin').value;

	try {
		const res= await fetch('./content/', {
			method: 'PATCH',
			body: JSON.stringify({ content: globalContent, layoutData: layoutData }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (res.status === 200) {
			window.open('./', '_self');
			return;
		}
		document.querySelector('#loading-overlay').style.display= 'none';
		document.querySelector('#loading-dialog').style.display= 'none';
		document.querySelector('#content-fragment .status-msg').innerHTML= 'Try again!'
		setTimeout(() => {document.querySelector('#content-fragment .status-msg').innerHTML= '';}, 3000);

	} catch (e) {
		console.log(e)
		document.querySelector('#loading-overlay').style.display= 'none';
		document.querySelector('#loading-dialog').style.display= 'none';
		document.querySelector('#content-fragment .status-msg').innerHTML= 'Try again!'
		setTimeout(() => {document.querySelector('#content-fragment .status-msg').innerHTML= '';}, 3000);
	}
}

