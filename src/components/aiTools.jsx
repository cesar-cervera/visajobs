// ai tools sidebar component
// provides ai powered tools for international students
export function AiTools() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-fit">
      <h2 className="text-lg font-bold text-gray-800 mb-4">AI Tools</h2>
      <div className="flex flex-col gap-3">
        <div className="p-3 bg-blue-50 text-blue-700 rounded-lg font-medium cursor-pointer hover:bg-blue-100">
          Resume Checker
        </div>
        <div className="p-3 bg-blue-50 text-blue-700 rounded-lg font-medium cursor-pointer hover:bg-blue-100">
          Visa Advisor
        </div>
        <div className="p-3 bg-blue-50 text-blue-700 rounded-lg font-medium cursor-pointer hover:bg-blue-100">
          Cover Letter Generator
        </div>
      </div>
    </div>
  );
}