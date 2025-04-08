"use client"

import { useState, useEffect } from "react"
import { supabase } from "../lib/supabaseClient"
import NavBar from "../components/navBar"
import Footer from "../components/footer"

export default function AdminDashboard() {
  // State for each table
  const [programs, setPrograms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [contents, setContents] = useState([]);

  // State for the currently edited item
  const [editingItem, setEditingItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // State for new item forms
  const [newProgram, setNewProgram] = useState({
    programname: "",
    description: "",
    duration: "",
    cost: "",
    titlegranted: "",
    fulldescription: "",
  });

  const [newCourse, setNewCourse] = useState({
    coursename: "",
    description: "",
    duration: "",
    programid: "",
    fulldescription: "",
    objectives: "",
    prerequisites: "",
  });

  const [newModule, setNewModule] = useState({
    modulename: "",
    description: "",
    duration: "",
    courseid: "",
  });

  const [newLesson, setNewLesson] = useState({
    lessonname: "",
    description: "",
    moduleid: "",
  });

  const [newContent, setNewContent] = useState({
    lessonid: "",
    contenttype: "",
    content: "",
    orderindex: 0,
  });

  // State for tabs
  const [activeTab, setActiveTab] = useState("programs");

  // State for modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  // State for notifications
  const [notification, setNotification] = useState(null);

  // Show notification
  const showNotification = (title, message, type = "success") => {
    setNotification({ title, message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    await fetchPrograms();
    await fetchCourses();
    await fetchModules();
    await fetchLessons();
    await fetchContents();
  };

  const fetchPrograms = async () => {
    const { data, error } = await supabase.from("programs").select("*");
    if (error) {
      showNotification("Error fetching programs", error.message, "error");
      return;
    }
    setPrograms(data);
  };

  const fetchCourses = async () => {
    const { data, error } = await supabase.from("courses").select("*");
    if (error) {
      showNotification("Error fetching courses", error.message, "error");
      return;
    }
    setCourses(data);
  };
  const fetchModules = async () => {
    const { data, error } = await supabase.from("modules").select("*");
    if (error) {
      showNotification("Error fetching modules", error.message, "error");
      return;
    }
    setModules(data);
  };

  const fetchLessons = async () => {
    const { data, error } = await supabase.from("lesson").select("*");
    if (error) {
      showNotification("Error fetching lessons", error.message, "error");
      return;
    }
    setLessons(data);
  };

  const fetchContents = async () => {
    const { data, error } = await supabase.from("content").select("*");
    if (error) {
      showNotification("Error fetching content", error.message, "error");
      return;
    }
    setContents(data);
  };

  // Create functions
  const createProgram = async () => {
    const { data, error } = await supabase
      .from("programs")
      .insert([newProgram])
      .select();

    if (error) {
      showNotification("Error creating program", error.message, "error");
      return;
    }

    showNotification(
      "Program created",
      "The program has been created successfully."
    );

    setNewProgram({
      programname: "",
      description: "",
      duration: "",
      cost: "",
      titlegranted: "",
      fulldescription: "",
    });

    setIsAddModalOpen(false);
    await fetchPrograms();
  };

  const createCourse = async () => {
    const { data, error } = await supabase
      .from("courses")
      .insert([newCourse])
      .select();

    if (error) {
      showNotification("Error creating course", error.message, "error");
      return;
    }

    showNotification(
      "Course created",
      "The course has been created successfully."
    );

    setNewCourse({
      coursename: "",
      description: "",
      duration: "",
      programid: "",
      fulldescription: "",
      objectives: "",
      prerequisites: "",
    });

    setIsAddModalOpen(false);
    await fetchCourses();
  };

  const createModule = async () => {
    const { data, error } = await supabase
      .from("modules")
      .insert([newModule])
      .select();

    if (error) {
      showNotification("Error creating module", error.message, "error");
      return;
    }

    showNotification(
      "Module created",
      "The module has been created successfully."
    );

    setNewModule({
      modulename: "",
      description: "",
      duration: "",
      courseid: "",
    });

    setIsAddModalOpen(false);
    await fetchModules();
  };

  const createLesson = async () => {
    const { data, error } = await supabase
      .from("lesson")
      .insert([newLesson])
      .select();

    if (error) {
      showNotification("Error creating lesson", error.message, "error");
      return;
    }

    showNotification(
      "Lesson created",
      "The lesson has been created successfully."
    );

    setNewLesson({
      lessonname: "",
      description: "",
      moduleid: "",
    });

    setIsAddModalOpen(false);
    await fetchLessons();
  };

  const createContent = async () => {
    const { data, error } = await supabase
      .from("content")
      .insert([newContent])
      .select();

    if (error) {
      showNotification("Error creating content", error.message, "error");
      return;
    }

    showNotification(
      "Content created",
      "The content has been created successfully."
    );

    setNewContent({
      lessonid: "",
      contenttype: "",
      content: "",
      orderindex: 0,
    });

    setIsAddModalOpen(false);
    await fetchContents();
  };

  // Update functions
  const startEditing = (item, type) => {
    setEditingItem({ ...item, type });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setEditingItem(null);
    setIsEditing(false);
  };

  const updateItem = async () => {
    if (!editingItem) return;

    const { type, ...item } = editingItem;
    let error;

    switch (type) {
      case "program":
        const { error: programError } = await supabase
          .from("programs")
          .update(item)
          .eq("programid", item.programid);
        error = programError;
        break;
      case "course":
        const { error: courseError } = await supabase
          .from("courses")
          .update(item)
          .eq("courseid", item.courseid);
        error = courseError;
        break;
      case "module":
        const { error: moduleError } = await supabase
          .from("modules")
          .update(item)
          .eq("moduleid", item.moduleid);
        error = moduleError;
        break;
      case "lesson":
        const { error: lessonError } = await supabase
          .from("lesson")
          .update(item)
          .eq("lessonid", item.lessonid);
        error = lessonError;
        break;
      case "content":
        const { error: contentError } = await supabase
          .from("content")
          .update(item)
          .eq("contentid", item.contentid);
        error = contentError;
        break;
    }

    if (error) {
      showNotification(`Error updating ${type}`, error.message, "error");
      return;
    }

    showNotification(
      `${type.charAt(0).toUpperCase() + type.slice(1)} updated`,
      `The ${type} has been updated successfully.`
    );

    setEditingItem(null);
    setIsEditing(false);
    fetchAllData();
  };

  // Delete functions
  const deleteItem = async (id, type) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

    let error;

    switch (type) {
      case "program":
        const { error: programError } = await supabase
          .from("programs")
          .delete()
          .eq("programid", id);
        error = programError;
        break;
      case "course":
        const { error: courseError } = await supabase
          .from("courses")
          .delete()
          .eq("courseid", id);
        error = courseError;
        break;
      case "module":
        const { error: moduleError } = await supabase
          .from("modules")
          .delete()
          .eq("moduleid", id);
        error = moduleError;
        break;
      case "lesson":
        const { error: lessonError } = await supabase
          .from("lesson")
          .delete()
          .eq("lessonid", id);
        error = lessonError;
        break;
      case "content":
        const { error: contentError } = await supabase
          .from("content")
          .delete()
          .eq("contentid", id);
        error = contentError;
        break;
    }

    if (error) {
      showNotification(`Error deleting ${type}`, error.message, "error");
      return;
    }

    showNotification(
      `${type.charAt(0).toUpperCase() + type.slice(1)} deleted`,
      `The ${type} has been deleted successfully.`
    );

    fetchAllData();
  };

  // Handle input changes for editing
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingItem((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select changes for editing
  const handleEditSelectChange = (name, value) => {
    setEditingItem((prev) => ({ ...prev, [name]: value }));
  };

  // Open add modal
  const openAddModal = (type) => {
    setModalType(type);
    setIsAddModalOpen(true);
  };
  // From here on, this is the return body of the page
  return (
    <>
      <NavBar />
      <div className="container mx-auto py-8">
        {/* Notification */}
        {notification && (
          <div
            className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
              notification.type === "error"
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white"
            }`}
          >
            <h3 className="font-bold">{notification.title}</h3>
            <p>{notification.message}</p>
          </div>
        )}

        <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="w-full">
          <div className="grid grid-cols-5 mb-8">
            {["programs", "courses", "modules", "lessons", "content"].map(
              (tab) => (
                <button
                  key={tab}
                  className={`py-2 px-4 text-center ${
                    activeTab === tab
                      ? "bg-gray-200 font-medium border-b-2 border-gray-800"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              )
            )}
          </div>

          {/* Programs Tab */}
          {activeTab === "programs" && (
            <div className="border rounded-lg shadow-sm bg-white">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">Programs</h2>
                    <p className="text-sm text-gray-500">
                      Manage your educational programs
                    </p>
                  </div>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                    onClick={() => openAddModal("program")}
                  >
                    <span className="text-lg">+</span>
                    <span>Add Program</span>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="grid gap-4">
                  {programs.map((program) => (
                    <div
                      key={program.programid}
                      className="p-4 border rounded-lg bg-white shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {program.programname}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Duration: {program.duration}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            className="p-2 border rounded-md hover:bg-gray-100"
                            onClick={() => startEditing(program, "program")}
                          >
                            ✏️
                          </button>
                          <button
                            className="p-2 border rounded-md hover:bg-gray-100 text-red-500"
                            onClick={() =>
                              deleteItem(program.programid, "program")
                            }
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      <p className="text-sm">{program.description}</p>
                      {program.cost && (
                        <p className="text-sm mt-2">Cost: ${program.cost}</p>
                      )}
                      {program.titlegranted && (
                        <p className="text-sm">Title: {program.titlegranted}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === "courses" && (
            <div className="border rounded-lg shadow-sm bg-white">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">Courses</h2>
                    <p className="text-sm text-gray-500">Manage your courses</p>
                  </div>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                    onClick={() => openAddModal("course")}
                  >
                    <span className="text-lg">+</span>
                    <span>Add Course</span>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="grid gap-4">
                  {courses.map((course) => (
                    <div
                      key={course.courseid}
                      className="p-4 border rounded-lg bg-white shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {course.coursename}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Program:{" "}
                            {programs.find(
                              (p) => p.programid === course.programid
                            )?.programname || "Unknown"}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            className="p-2 border rounded-md hover:bg-gray-100"
                            onClick={() => startEditing(course, "course")}
                          >
                            ✏️
                          </button>
                          <button
                            className="p-2 border rounded-md hover:bg-gray-100 text-red-500"
                            onClick={() =>
                              deleteItem(course.courseid, "course")
                            }
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      <p className="text-sm">{course.description}</p>
                      <p className="text-sm mt-2">
                        Duration: {course.duration}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Modules Tab */}
          {activeTab === "modules" && (
            <div className="border rounded-lg shadow-sm bg-white">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">Modules</h2>
                    <p className="text-sm text-gray-500">Manage your modules</p>
                  </div>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                    onClick={() => openAddModal("module")}
                  >
                    <span className="text-lg">+</span>
                    <span>Add Module</span>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="grid gap-4">
                  {modules.map((module) => (
                    <div
                      key={module.moduleid}
                      className="p-4 border rounded-lg bg-white shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {module.modulename}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Course:{" "}
                            {courses.find((c) => c.courseid === module.courseid)
                              ?.coursename || "Unknown"}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            className="p-2 border rounded-md hover:bg-gray-100"
                            onClick={() => startEditing(module, "module")}
                          >
                            ✏️
                          </button>
                          <button
                            className="p-2 border rounded-md hover:bg-gray-100 text-red-500"
                            onClick={() =>
                              deleteItem(module.moduleid, "module")
                            }
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      <p className="text-sm">{module.description}</p>
                      <p className="text-sm mt-2">
                        Duration: {module.duration}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Lessons Tab */}
          {activeTab === "lessons" && (
            <div className="border rounded-lg shadow-sm bg-white">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">Lessons</h2>
                    <p className="text-sm text-gray-500">Manage your lessons</p>
                  </div>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                    onClick={() => openAddModal("lesson")}
                  >
                    <span className="text-lg">+</span>
                    <span>Add Lesson</span>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="grid gap-4">
                  {lessons.map((lesson) => (
                    <div
                      key={lesson.lessonid}
                      className="p-4 border rounded-lg bg-white shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {lesson.lessonname}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Module:{" "}
                            {modules.find((m) => m.moduleid === lesson.moduleid)
                              ?.modulename || "Unknown"}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            className="p-2 border rounded-md hover:bg-gray-100"
                            onClick={() => startEditing(lesson, "lesson")}
                          >
                            ✏️
                          </button>
                          <button
                            className="p-2 border rounded-md hover:bg-gray-100 text-red-500"
                            onClick={() =>
                              deleteItem(lesson.lessonid, "lesson")
                            }
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      <p className="text-sm">{lesson.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Content Tab */}
          {activeTab === "content" && (
            <div className="border rounded-lg shadow-sm bg-white">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">Content</h2>
                    <p className="text-sm text-gray-500">Manage your content</p>
                  </div>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                    onClick={() => openAddModal("content")}
                  >
                    <span className="text-lg">+</span>
                    <span>Add Content</span>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="grid gap-4">
                  {contents.map((content) => (
                    <div
                      key={content.contentid}
                      className="p-4 border rounded-lg bg-white shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {lessons.find(
                              (l) => l.lessonid === content.lessonid
                            )?.lessonname || "Unknown Lesson"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Type: {content.contenttype} | Order:{" "}
                            {content.orderindex}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            className="p-2 border rounded-md hover:bg-gray-100"
                            onClick={() => startEditing(content, "content")}
                          >
                            ✏️
                          </button>
                          <button
                            className="p-2 border rounded-md hover:bg-gray-100 text-red-500"
                            onClick={() =>
                              deleteItem(content.contentid, "content")
                            }
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      <p className="text-sm">{content.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Add Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  Add New{" "}
                  {modalType.charAt(0).toUpperCase() + modalType.slice(1)}
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700 text-xl"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  ×
                </button>
              </div>

              <div className="grid gap-4 py-4">
                {modalType === "program" && (
                  <>
                    <div className="grid gap-2">
                      <label htmlFor="programname" className="font-medium">
                        Program Name
                      </label>
                      <input
                        id="programname"
                        className="border rounded-md p-2"
                        value={newProgram.programname}
                        onChange={(e) =>
                          setNewProgram({
                            ...newProgram,
                            programname: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="description" className="font-medium">
                        Description
                      </label>
                      <textarea
                        id="description"
                        className="border rounded-md p-2"
                        rows="3"
                        value={newProgram.description}
                        onChange={(e) =>
                          setNewProgram({
                            ...newProgram,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="fulldescription" className="font-medium">
                        Full Description
                      </label>
                      <textarea
                        id="fulldescription"
                        className="border rounded-md p-2"
                        rows="3"
                        value={newProgram.fulldescription}
                        onChange={(e) =>
                          setNewProgram({
                            ...newProgram,
                            fulldescription: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="duration" className="font-medium">
                          Duration
                        </label>
                        <input
                          id="duration"
                          className="border rounded-md p-2"
                          value={newProgram.duration}
                          onChange={(e) =>
                            setNewProgram({
                              ...newProgram,
                              duration: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="cost" className="font-medium">
                          Cost
                        </label>
                        <input
                          id="cost"
                          type="number"
                          className="border rounded-md p-2"
                          value={newProgram.cost}
                          onChange={(e) =>
                            setNewProgram({
                              ...newProgram,
                              cost: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="titlegranted" className="font-medium">
                        Title Granted
                      </label>
                      <input
                        id="titlegranted"
                        className="border rounded-md p-2"
                        value={newProgram.titlegranted}
                        onChange={(e) =>
                          setNewProgram({
                            ...newProgram,
                            titlegranted: e.target.value,
                          })
                        }
                      />
                    </div>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-2"
                      onClick={createProgram}
                    >
                      Create Program
                    </button>
                  </>
                )}

                {modalType === "course" && (
                  <>
                    <div className="grid gap-2">
                      <label htmlFor="coursename" className="font-medium">
                        Course Name
                      </label>
                      <input
                        id="coursename"
                        className="border rounded-md p-2"
                        value={newCourse.coursename}
                        onChange={(e) =>
                          setNewCourse({
                            ...newCourse,
                            coursename: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="description" className="font-medium">
                        Description
                      </label>
                      <textarea
                        id="description"
                        className="border rounded-md p-2"
                        rows="3"
                        value={newCourse.description}
                        onChange={(e) =>
                          setNewCourse({
                            ...newCourse,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="fulldescription" className="font-medium">
                        Full Description
                      </label>
                      <textarea
                        id="fulldescription"
                        className="border rounded-md p-2"
                        rows="3"
                        value={newCourse.fulldescription}
                        onChange={(e) =>
                          setNewCourse({
                            ...newCourse,
                            fulldescription: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="objectives" className="font-medium">
                        Objectives
                      </label>
                      <textarea
                        id="objectives"
                        className="border rounded-md p-2"
                        rows="3"
                        value={newCourse.objectives}
                        onChange={(e) =>
                          setNewCourse({
                            ...newCourse,
                            objectives: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="prerequisites" className="font-medium">
                        Prerequisites
                      </label>
                      <textarea
                        id="prerequisites"
                        className="border rounded-md p-2"
                        rows="3"
                        value={newCourse.prerequisites}
                        onChange={(e) =>
                          setNewCourse({
                            ...newCourse,
                            prerequisites: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="duration" className="font-medium">
                          Duration
                        </label>
                        <input
                          id="duration"
                          className="border rounded-md p-2"
                          value={newCourse.duration}
                          onChange={(e) =>
                            setNewCourse({
                              ...newCourse,
                              duration: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="programid" className="font-medium">
                          Program
                        </label>
                        <select
                          id="programid"
                          className="border rounded-md p-2"
                          value={newCourse.programid}
                          onChange={(e) =>
                            setNewCourse({
                              ...newCourse,
                              programid: e.target.value,
                            })
                          }
                        >
                          <option value="">Select a program</option>
                          {programs.map((program) => (
                            <option
                              key={program.programid}
                              value={program.programid.toString()}
                            >
                              {program.programname}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-2"
                      onClick={createCourse}
                    >
                      Create Course
                    </button>
                  </>
                )}

                {modalType === "module" && (
                  <>
                    <div className="grid gap-2">
                      <label htmlFor="modulename" className="font-medium">
                        Module Name
                      </label>
                      <input
                        id="modulename"
                        className="border rounded-md p-2"
                        value={newModule.modulename}
                        onChange={(e) =>
                          setNewModule({
                            ...newModule,
                            modulename: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="description" className="font-medium">
                        Description
                      </label>
                      <textarea
                        id="description"
                        className="border rounded-md p-2"
                        rows="3"
                        value={newModule.description}
                        onChange={(e) =>
                          setNewModule({
                            ...newModule,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="duration" className="font-medium">
                          Duration
                        </label>
                        <input
                          id="duration"
                          className="border rounded-md p-2"
                          value={newModule.duration}
                          onChange={(e) =>
                            setNewModule({
                              ...newModule,
                              duration: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="courseid" className="font-medium">
                          Course
                        </label>
                        <select
                          id="courseid"
                          className="border rounded-md p-2"
                          value={newModule.courseid}
                          onChange={(e) =>
                            setNewModule({
                              ...newModule,
                              courseid: e.target.value,
                            })
                          }
                        >
                          <option value="">Select a course</option>
                          {courses.map((course) => (
                            <option
                              key={course.courseid}
                              value={course.courseid.toString()}
                            >
                              {course.coursename}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-2"
                      onClick={createModule}
                    >
                      Create Module
                    </button>
                  </>
                )}

                {modalType === "lesson" && (
                  <>
                    <div className="grid gap-2">
                      <label htmlFor="lessonname" className="font-medium">
                        Lesson Name
                      </label>
                      <input
                        id="lessonname"
                        className="border rounded-md p-2"
                        value={newLesson.lessonname}
                        onChange={(e) =>
                          setNewLesson({
                            ...newLesson,
                            lessonname: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="description" className="font-medium">
                        Description
                      </label>
                      <textarea
                        id="description"
                        className="border rounded-md p-2"
                        rows="3"
                        value={newLesson.description}
                        onChange={(e) =>
                          setNewLesson({
                            ...newLesson,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="moduleid" className="font-medium">
                        Module
                      </label>
                      <select
                        id="moduleid"
                        className="border rounded-md p-2"
                        value={newLesson.moduleid}
                        onChange={(e) =>
                          setNewLesson({
                            ...newLesson,
                            moduleid: e.target.value,
                          })
                        }
                      >
                        <option value="">Select a module</option>
                        {modules.map((module) => (
                          <option
                            key={module.moduleid}
                            value={module.moduleid.toString()}
                          >
                            {module.modulename}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-2"
                      onClick={createLesson}
                    >
                      Create Lesson
                    </button>
                  </>
                )}

                {modalType === "content" && (
                  <>
                    <div className="grid gap-2">
                      <label htmlFor="lessonid" className="font-medium">
                        Lesson
                      </label>
                      <select
                        id="lessonid"
                        className="border rounded-md p-2"
                        value={newContent.lessonid}
                        onChange={(e) =>
                          setNewContent({
                            ...newContent,
                            lessonid: e.target.value,
                          })
                        }
                      >
                        <option value="">Select a lesson</option>
                        {lessons.map((lesson) => (
                          <option
                            key={lesson.lessonid}
                            value={lesson.lessonid.toString()}
                          >
                            {lesson.lessonname}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="contenttype" className="font-medium">
                        Content Type
                      </label>
                      <select
                        id="contenttype"
                        className="border rounded-md p-2"
                        value={newContent.contenttype}
                        onChange={(e) =>
                          setNewContent({
                            ...newContent,
                            contenttype: e.target.value,
                          })
                        }
                      >
                        <option value="">Select content type</option>
                        <option value="text">Text</option>
                        <option value="video">Video</option>
                        <option value="image">Image</option>
                        <option value="quiz">Quiz</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="content" className="font-medium">
                        Content
                      </label>
                      <textarea
                        id="content"
                        className="border rounded-md p-2"
                        rows="3"
                        value={newContent.content}
                        onChange={(e) =>
                          setNewContent({
                            ...newContent,
                            content: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="orderindex" className="font-medium">
                        Order Index
                      </label>
                      <input
                        id="orderindex"
                        type="number"
                        className="border rounded-md p-2"
                        value={newContent.orderindex}
                        onChange={(e) =>
                          setNewContent({
                            ...newContent,
                            orderindex: Number.parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-2"
                      onClick={createContent}
                    >
                      Create Content
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditing && editingItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  Edit{" "}
                  {editingItem.type.charAt(0).toUpperCase() +
                    editingItem.type.slice(1)}
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700 text-xl"
                  onClick={cancelEditing}
                >
                  ×
                </button>
              </div>

              <div className="grid gap-4 py-4">
                {editingItem.type === "program" && (
                  <>
                    <div className="grid gap-2">
                      <label htmlFor="edit-programname" className="font-medium">
                        Program Name
                      </label>
                      <input
                        id="edit-programname"
                        name="programname"
                        className="border rounded-md p-2"
                        value={editingItem.programname || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="edit-description" className="font-medium">
                        Description
                      </label>
                      <textarea
                        id="edit-description"
                        name="description"
                        className="border rounded-md p-2"
                        rows="3"
                        value={editingItem.description || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="edit-fulldescription"
                        className="font-medium"
                      >
                        Full Description
                      </label>
                      <textarea
                        id="edit-fulldescription"
                        name="fulldescription"
                        className="border rounded-md p-2"
                        rows="3"
                        value={editingItem.fulldescription || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="edit-duration" className="font-medium">
                          Duration
                        </label>
                        <input
                          id="edit-duration"
                          name="duration"
                          className="border rounded-md p-2"
                          value={editingItem.duration || ""}
                          onChange={handleEditChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="edit-cost" className="font-medium">
                          Cost
                        </label>
                        <input
                          id="edit-cost"
                          name="cost"
                          type="number"
                          className="border rounded-md p-2"
                          value={editingItem.cost || ""}
                          onChange={handleEditChange}
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="edit-titlegranted"
                        className="font-medium"
                      >
                        Title Granted
                      </label>
                      <input
                        id="edit-titlegranted"
                        name="titlegranted"
                        className="border rounded-md p-2"
                        value={editingItem.titlegranted || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                  </>
                )}

                {editingItem.type === "course" && (
                  <>
                    <div className="grid gap-2">
                      <label htmlFor="edit-coursename" className="font-medium">
                        Course Name
                      </label>
                      <input
                        id="edit-coursename"
                        name="coursename"
                        className="border rounded-md p-2"
                        value={editingItem.coursename || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="edit-description" className="font-medium">
                        Description
                      </label>
                      <textarea
                        id="edit-description"
                        name="description"
                        className="border rounded-md p-2"
                        rows="3"
                        value={editingItem.description || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="edit-fulldescription"
                        className="font-medium"
                      >
                        Full Description
                      </label>
                      <textarea
                        id="edit-fulldescription"
                        name="fulldescription"
                        className="border rounded-md p-2"
                        rows="3"
                        value={editingItem.fulldescription || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="edit-objectives" className="font-medium">
                        Objectives
                      </label>
                      <textarea
                        id="edit-objectives"
                        name="objectives"
                        className="border rounded-md p-2"
                        rows="3"
                        value={editingItem.objectives || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="edit-prerequisites"
                        className="font-medium"
                      >
                        Prerequisites
                      </label>
                      <textarea
                        id="edit-prerequisites"
                        name="prerequisites"
                        className="border rounded-md p-2"
                        rows="3"
                        value={editingItem.prerequisites || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="edit-duration" className="font-medium">
                          Duration
                        </label>
                        <input
                          id="edit-duration"
                          name="duration"
                          className="border rounded-md p-2"
                          value={editingItem.duration || ""}
                          onChange={handleEditChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="edit-programid" className="font-medium">
                          Program
                        </label>
                        <select
                          id="edit-programid"
                          className="border rounded-md p-2"
                          value={editingItem.programid?.toString() || ""}
                          onChange={(e) =>
                            handleEditSelectChange("programid", e.target.value)
                          }
                        >
                          <option value="">Select a program</option>
                          {programs.map((program) => (
                            <option
                              key={program.programid}
                              value={program.programid.toString()}
                            >
                              {program.programname}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {editingItem.type === "module" && (
                  <>
                    <div className="grid gap-2">
                      <label htmlFor="edit-modulename" className="font-medium">
                        Module Name
                      </label>
                      <input
                        id="edit-modulename"
                        name="modulename"
                        className="border rounded-md p-2"
                        value={editingItem.modulename || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="edit-description" className="font-medium">
                        Description
                      </label>
                      <textarea
                        id="edit-description"
                        name="description"
                        className="border rounded-md p-2"
                        rows="3"
                        value={editingItem.description || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="edit-duration" className="font-medium">
                          Duration
                        </label>
                        <input
                          id="edit-duration"
                          name="duration"
                          className="border rounded-md p-2"
                          value={editingItem.duration || ""}
                          onChange={handleEditChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="edit-courseid" className="font-medium">
                          Course
                        </label>
                        <select
                          id="edit-courseid"
                          className="border rounded-md p-2"
                          value={editingItem.courseid?.toString() || ""}
                          onChange={(e) =>
                            handleEditSelectChange("courseid", e.target.value)
                          }
                        >
                          <option value="">Select a course</option>
                          {courses.map((course) => (
                            <option
                              key={course.courseid}
                              value={course.courseid.toString()}
                            >
                              {course.coursename}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {editingItem.type === "lesson" && (
                  <>
                    <div className="grid gap-2">
                      <label htmlFor="edit-lessonname" className="font-medium">
                        Lesson Name
                      </label>
                      <input
                        id="edit-lessonname"
                        name="lessonname"
                        className="border rounded-md p-2"
                        value={editingItem.lessonname || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="edit-description" className="font-medium">
                        Description
                      </label>
                      <textarea
                        id="edit-description"
                        name="description"
                        className="border rounded-md p-2"
                        rows="3"
                        value={editingItem.description || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="edit-moduleid" className="font-medium">
                        Module
                      </label>
                      <select
                        id="edit-moduleid"
                        className="border rounded-md p-2"
                        value={editingItem.moduleid?.toString() || ""}
                        onChange={(e) =>
                          handleEditSelectChange("moduleid", e.target.value)
                        }
                      >
                        <option value="">Select a module</option>
                        {modules.map((module) => (
                          <option
                            key={module.moduleid}
                            value={module.moduleid.toString()}
                          >
                            {module.modulename}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {editingItem.type === "content" && (
                  <>
                    <div className="grid gap-2">
                      <label htmlFor="edit-lessonid" className="font-medium">
                        Lesson
                      </label>
                      <select
                        id="edit-lessonid"
                        className="border rounded-md p-2"
                        value={editingItem.lessonid?.toString() || ""}
                        onChange={(e) =>
                          handleEditSelectChange("lessonid", e.target.value)
                        }
                      >
                        <option value="">Select a lesson</option>
                        {lessons.map((lesson) => (
                          <option
                            key={lesson.lessonid}
                            value={lesson.lessonid.toString()}
                          >
                            {lesson.lessonname}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="edit-contenttype" className="font-medium">
                        Content Type
                      </label>
                      <select
                        id="edit-contenttype"
                        className="border rounded-md p-2"
                        value={editingItem.contenttype || ""}
                        onChange={(e) =>
                          handleEditSelectChange("contenttype", e.target.value)
                        }
                      >
                        <option value="">Select content type</option>
                        <option value="text">Text</option>
                        <option value="video">Video</option>
                        <option value="image">Image</option>
                        <option value="quiz">Quiz</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="edit-content" className="font-medium">
                        Content
                      </label>
                      <textarea
                        id="edit-content"
                        name="content"
                        className="border rounded-md p-2"
                        rows="3"
                        value={editingItem.content || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="edit-orderindex" className="font-medium">
                        Order Index
                      </label>
                      <input
                        id="edit-orderindex"
                        name="orderindex"
                        type="number"
                        className="border rounded-md p-2"
                        value={editingItem.orderindex || 0}
                        onChange={handleEditChange}
                      />
                    </div>
                  </>
                )}

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                    onClick={cancelEditing}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={updateItem}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

