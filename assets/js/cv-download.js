(() => {
"use strict";
const button = document.querySelector("[data-download-pdf]");
const status = document.querySelector("#cv-download-status");
if (!button) return;
const txt = (node) => (node?.innerText || node?.textContent || "").replace(/\s+/g, " ").trim();
const get = (selector, root = document) => txt(root.querySelector(selector));
const panel = (id) => document.querySelector("#" + id)?.closest(".cv-panel");
const side = (title) => [...document.querySelectorAll(".cv-sidebar-panel")].find(p => get("h2", p).toLowerCase() === title.toLowerCase());
const heading = (title) => ({text:title.toUpperCase(),style:"sectionTitle",margin:[0,15,0,7]});
const entry = (node) => ({stack:[
{columns:[{text:get("h3",node),style:"entryTitle",width:"*"},{text:get(".cv-year",node),style:"year",width:"auto",alignment:"right"}],columnGap:8},
{text:get(".cv-institution",node),style:"institution",margin:[0,2,0,2]},
{text:get(".cv-detail",node),style:"bodyText"}
],margin:[0,0,0,9],unbreakable:true});
function build() {
const profile = [...document.querySelectorAll(".cv-overview-main p")].find(p=>!p.classList.contains("cv-label"));
const facts = [...document.querySelectorAll(".cv-fact")].map(n=>[get("span",n),txt(n.querySelector("strong"))]);
const fact = name => facts.find(x=>x[0].toLowerCase()===name.toLowerCase())?.[1] || "";
const skills = [...(panel("skills-heading")?.querySelectorAll("li")||[])].map(txt);
const content = [
{table:{widths:["*","auto"],body:[[{stack:[
{text:get(".cv-hero h1").replace(/\s+/g," ").replace(/,?\s*Registered Midwife\.?$/i,"").trim(),style:"name"},
{text:"REGISTERED MIDWIFE",style:"role",margin:[0,5,0,7]},
{text:[fact("Email"),fact("Preferred location")].filter(Boolean).join("   •   "),style:"contact"}
],fillColor:"#183247",margin:[17,16,12,16]},{text:"S",fontSize:38,bold:true,color:"#b9d7d7",alignment:"center",fillColor:"#183247",margin:[8,16,16,16]}]]},layout:{hLineWidth:()=>0,vLineWidth:()=>0,paddingLeft:()=>0,paddingRight:()=>0,paddingTop:()=>0,paddingBottom:()=>0},margin:[0,0,0,12]},
heading("Professional profile"),{text:txt(profile),style:"bodyText"},
heading("Clinical experience & training"),...[...(panel("experience-heading")?.querySelectorAll(".cv-timeline-item")||[])].map(entry),
heading("Education"),...[...(panel("education-heading")?.querySelectorAll(".cv-timeline-item")||[])].map(entry),
heading("Clinical skills & knowledge areas"),
{columns:[{width:"*",ul:skills.slice(0,Math.ceil(skills.length/2)),style:"bodyText"},{width:"*",ul:skills.slice(Math.ceil(skills.length/2)),style:"bodyText"}],columnGap:18}
];
const reg=side("Professional registration");
if(reg){content.push(heading("Professional registration"),{stack:[{text:get(".cv-registration strong",reg),style:"entryTitle"},{text:get(".cv-registration span",reg),style:"bodyText",margin:[0,3,0,0]}],fillColor:"#edf5f5",margin:[0,0,0,3]});}
const langs=side("Language proficiency");
if(langs){content.push(heading("Language proficiency"),{table:{widths:["*","auto"],body:[...langs.querySelectorAll(".cv-language-row")].map(r=>[{text:get("span",r),style:"bodyText"},{text:get("strong",r),style:"entryTitle",alignment:"right"}])},layout:{hLineColor:() => "#e2e9eb",hLineWidth:()=>0.5,vLineWidth:()=>0,paddingLeft:()=>0,paddingRight:()=>4,paddingTop:()=>5,paddingBottom:()=>5}});}
const career=side("Career direction"); if(career){content.push(heading("Career direction"),{text:get(".cv-objective",career),style:"bodyText"});}
const ref=side("Academic reference"); if(ref){content.push(heading("Academic reference"),{text:get(".cv-reference-name",ref),style:"entryTitle"},{text:[...ref.querySelectorAll(".cv-reference-role")].map(txt).join(" · "),style:"institution",margin:[0,2,0,2]});}
content.push({canvas:[{type:"line",x1:0,y1:0,x2:510,y2:0,lineWidth:.7,lineColor:"#d6e1e4"}],margin:[0,17,0,7]},{text:"Prepared for professional opportunities in midwifery. Registration number and referee contact details are not published publicly.",style:"smallNote"});
return {pageSize:"A4",pageMargins:[42,40,42,45],content,defaultStyle:{font:"Roboto",fontSize:9,color:"#344956",lineHeight:1.2},styles:{
name:{fontSize:18,bold:true,color:"#ffffff",characterSpacing:.3},role:{fontSize:9,bold:true,color:"#b9d7d7",characterSpacing:1.4},contact:{fontSize:7.5,color:"#e0ebee",lineHeight:1.3},
sectionTitle:{fontSize:9,bold:true,color:"#183247",characterSpacing:1.1},entryTitle:{fontSize:9.5,bold:true,color:"#203747"},year:{fontSize:8.5,bold:true,color:"#347b7a"},institution:{fontSize:8.3,bold:true,color:"#65747d"},bodyText:{fontSize:8.4,color:"#52616b",lineHeight:1.25},smallNote:{fontSize:7.3,color:"#75838b",italics:true}},
footer:(page,pages)=>({columns:[{text:"SUMAIYA AKTER  •  REGISTERED MIDWIFE",fontSize:7,color:"#75838b"},{text:"PAGE "+page+" OF "+pages,alignment:"right",fontSize:7,color:"#75838b"}],margin:[42,14,42,0]})};
}
button.addEventListener("click",()=>{
if(!window.pdfMake||!window.pdfMake.vfs){if(status)status.textContent="PDF library did not load. Check your internet connection, reload this page, and try again.";return;}
button.disabled=true;if(status)status.textContent="Preparing your professional CV…";
try{window.pdfMake.createPdf(build()).download("Sumaiya_Akter_Professional_CV.pdf");if(status)status.textContent="Your professional CV download has been requested.";}
catch(error){console.error("CV PDF generation failed:",error);if(status)status.textContent="The CV could not be generated. Please reload the page and try again.";}
finally{window.setTimeout(()=>{button.disabled=false;},1200);}
});
})();