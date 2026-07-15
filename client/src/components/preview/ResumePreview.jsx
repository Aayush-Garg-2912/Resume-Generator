import { useResume } from '../../context/ResumeContext';

const ResumePreview = () => {
  const { currentResume } = useResume();
  const { personalInfo, education, experience, projects, skills, certifications, achievements, extraActivities } = currentResume;

  const hasSkills = Object.values(skills || {}).some(arr => arr && arr.length > 0);

  return (
    <div className="resume-preview bg-white w-full max-w-[210mm] aspect-[1/1.414] p-8 sm:p-12 text-black text-[11px] font-serif relative leading-snug">
      {/* HEADER */}
      <header className="text-center mb-4">
        <h1 className="text-2xl font-bold uppercase tracking-wider mb-1">
          {personalInfo?.fullName || 'YOUR FULL NAME'}
        </h1>
        
        <div className="flex flex-wrap justify-center items-center gap-1 text-[10px] text-gray-800">
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          {personalInfo?.phone && personalInfo?.email && <span className="mx-1">|</span>}
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          
          {(personalInfo?.phone || personalInfo?.email) && personalInfo?.linkedin && <span className="mx-1">|</span>}
          {personalInfo?.linkedin && (
            <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="text-blue-600 underline">
              LinkedIn
            </a>
          )}
          
          {(personalInfo?.phone || personalInfo?.email || personalInfo?.linkedin) && personalInfo?.github && <span className="mx-1">|</span>}
          {personalInfo?.github && (
            <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} target="_blank" rel="noreferrer" className="text-blue-600 underline">
              GitHub
            </a>
          )}
        </div>
      </header>

      {/* SUMMARY */}
      {personalInfo?.summary && (
        <section className="mb-4">
          <h3 className="font-bold text-[11px] uppercase tracking-wider mb-2 border border-black inline-block px-1">Professional Summary</h3>
          <p className="text-[10px] text-justify leading-relaxed whitespace-pre-line">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* EDUCATION */}
      {education && education.length > 0 && (
        <section className="mb-4">
          <h3 className="font-bold text-[11px] uppercase tracking-wider mb-2 border border-black inline-block px-1">Education</h3>
          <table className="w-full border-collapse border border-black text-[10px]">
            <tbody>
              {education.map((edu, idx) => (
                <tr key={idx} className="border border-black">
                  <td className="border border-black px-2 py-1 font-bold">
                    {edu.degree} {edu.specialization ? `— ${edu.specialization}` : ''}
                  </td>
                  <td className="border border-black px-2 py-1">{edu.college || edu.university}</td>
                  <td className="border border-black px-2 py-1">{edu.cgpa || edu.percentage}</td>
                  <td className="border border-black px-2 py-1 whitespace-nowrap">{edu.startYear} - {edu.endYear || 'Present'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* TECHNICAL SKILLS */}
      {hasSkills && (
        <section className="mb-4">
          <h3 className="font-bold text-[11px] uppercase tracking-wider mb-1 border border-black inline-block px-1">Technical Skills</h3>
          <div className="text-[10px] space-y-0.5">
            {skills.languages?.length > 0 && (
              <p><span className="font-bold">Languages:</span> {skills.languages.join(', ')}</p>
            )}
            {skills.frontend?.length > 0 && (
              <p><span className="font-bold">Frontend:</span> {skills.frontend.join(', ')}</p>
            )}
            {skills.backend?.length > 0 && (
              <p><span className="font-bold">Backend:</span> {skills.backend.join(', ')}</p>
            )}
            {skills.databases?.length > 0 && (
              <p><span className="font-bold">Databases:</span> {skills.databases.join(', ')}</p>
            )}
            {skills.coreSubjects?.length > 0 && (
              <p><span className="font-bold">Core CS:</span> {skills.coreSubjects.join(', ')}</p>
            )}
            {skills.developerTools?.length > 0 && (
              <p><span className="font-bold">DevTools:</span> {skills.developerTools.join(', ')}</p>
            )}
          </div>
        </section>
      )}

      {/* EXPERIENCE */}
      {experience && experience.length > 0 && (
        <section className="mb-4">
          <h3 className="font-bold text-[11px] uppercase tracking-wider mb-2 border border-black inline-block px-1">Experience</h3>
          <div className="space-y-3">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start mb-1">
                  <p className="font-bold text-[11px]">
                    {exp.role} — {exp.company}
                  </p>
                  <p className="text-[10px] font-bold">
                    ({exp.startDate} - {exp.currentWorking ? 'Present' : exp.endDate})
                  </p>
                </div>
                {exp.description && (
                  <ul className="list-disc pl-5 text-[10px] space-y-0.5 text-justify">
                    {exp.description.split('\n').filter(line => line.trim() !== '').map((line, i) => {
                      let cleanLine = line.trim();
                      if (cleanLine.startsWith('-') || cleanLine.startsWith('•')) {
                        cleanLine = cleanLine.substring(1).trim();
                      }
                      return <li key={i}>{cleanLine}</li>;
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {projects && projects.length > 0 && (
        <section className="mb-4">
          <h3 className="font-bold text-[11px] uppercase tracking-wider mb-2 border border-black inline-block px-1">Projects</h3>
          <div className="space-y-3">
            {projects.map((proj, idx) => (
              <div key={idx}>
                <div className="mb-0.5 flex items-center gap-1">
                  <p className="font-bold text-[11px] inline">
                    {proj.projectName}
                  </p>
                  {proj.githubLink && (
                    <a href={proj.githubLink.startsWith('http') ? proj.githubLink : `https://${proj.githubLink}`} target="_blank" rel="noreferrer" className="text-blue-600 underline text-[10px] ml-1">
                      GitHub
                    </a>
                  )}
                  {proj.liveDemo && (
                    <a href={proj.liveDemo.startsWith('http') ? proj.liveDemo : `https://${proj.liveDemo}`} target="_blank" rel="noreferrer" className="text-blue-600 underline text-[10px] ml-1">
                      Live
                    </a>
                  )}
                </div>
                {proj.techStack?.length > 0 && (
                  <p className="text-[10px] italic mb-1 text-gray-700">
                    Stack: {proj.techStack.join(' - ')}
                  </p>
                )}
                {proj.description && (
                  <ul className="list-disc pl-5 text-[10px] space-y-0.5 text-justify">
                    {proj.description.split('\n').filter(line => line.trim() !== '').map((line, i) => {
                      let cleanLine = line.trim();
                      if (cleanLine.startsWith('-') || cleanLine.startsWith('•')) {
                        cleanLine = cleanLine.substring(1).trim();
                      }
                      return <li key={i}>{cleanLine}</li>;
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CERTIFICATIONS */}
      {certifications && certifications.length > 0 && (
        <section className="mb-4">
          <h3 className="font-bold text-[11px] uppercase tracking-wider mb-2 border border-black inline-block px-1">Certifications</h3>
          <ul className="list-disc pl-5 text-[10px] space-y-0.5">
            {certifications.map((cert, idx) => (
              <li key={idx}>
                <span className="font-bold">{cert.certificateName}</span> {cert.organization ? `— ${cert.organization}` : ''}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ACHIEVEMENTS */}
      {achievements && achievements.length > 0 && (
        <section className="mb-4">
          <h3 className="font-bold text-[11px] uppercase tracking-wider mb-2 border border-black inline-block px-1">Achievements</h3>
          <ul className="list-disc pl-5 text-[10px] space-y-0.5">
            {achievements.map((ach, idx) => (
              <li key={idx}>
                {ach.title && <span className="font-bold">{ach.title} — </span>}
                {ach.description}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* POSITIONS OF RESPONSIBILITY */}
      {extraActivities?.positionsOfResponsibility?.filter(p => p.trim()).length > 0 && (
        <section className="mb-4">
          <h3 className="font-bold text-[11px] uppercase tracking-wider mb-2 border border-black inline-block px-1">Positions of Responsibility</h3>
          <ul className="list-disc pl-5 text-[10px] space-y-0.5">
            {extraActivities.positionsOfResponsibility.filter(pos => pos.trim()).map((pos, idx) => (
              <li key={idx}>{pos}</li>
            ))}
          </ul>
        </section>
      )}

      {/* EXTRA-CURRICULAR ACTIVITIES */}
      {extraActivities?.extraCurricular?.filter(e => e.trim()).length > 0 && (
        <section className="mb-4">
          <h3 className="font-bold text-[11px] uppercase tracking-wider mb-2 border border-black inline-block px-1">Extra-Curricular Activities</h3>
          <ul className="list-disc pl-5 text-[10px] space-y-0.5">
            {extraActivities.extraCurricular.filter(ext => ext.trim()).map((ext, idx) => (
              <li key={idx}>{ext}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;
