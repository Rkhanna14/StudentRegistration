import { useState } from "react";
import {
  School as SchoolIcon,
  Assessment as AssessmentIcon,
  Comment as CommentIcon,
  Build as BuildIcon,
  Folder as FolderIcon,
} from "@mui/icons-material";

// "import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';"

function Sidebar(props) {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    if (item === "Courses") {
      props.onCourse(item);
    } else {
      props.onCourse(item);
    }
    setActiveItem(item);
  };

  return (
    <div className="sidebar">
      <div>
        <h4 className="head">Course</h4>
      </div>
      <ul>
        <button
          className={activeItem === "Performance" ? "active" : ""}
          onClick={() => handleItemClick("Performance")}
          style={{ display: "flex", alignItems: "center" }} // Added flex styling
        >
          <AssessmentIcon sx={{ marginRight: "8px" }} />
          <li>Performance</li>
        </button>
        <button
          className={activeItem === "Courses" ? "active" : ""}
          onClick={() => handleItemClick("Courses")}
          style={{ display: "flex", alignItems: "center" }} // Added flex styling
        >
          <SchoolIcon sx={{ marginRight: "8px" }} />
          <li>Courses</li>
        </button>
        <button
          className={activeItem === "Comment" ? "active" : ""}
          onClick={() => handleItemClick("Comment")}
          style={{ display: "flex", alignItems: "center" }} // Added flex styling
        >
          <CommentIcon sx={{ marginRight: "8px" }} />
          <li>Comment</li>
        </button>
        <button
          className={activeItem === "Tools" ? "active" : ""}
          onClick={() => handleItemClick("Tools")}
          style={{ display: "flex", alignItems: "center" }} // Added flex styling
        >
          <BuildIcon sx={{ marginRight: "8px" }} />
          <li>Tools</li>
        </button>
        <button
          className={activeItem === "Resources" ? "active" : ""}
          onClick={() => handleItemClick("Resources")}
          style={{ display: "flex", alignItems: "center" }} // Added flex styling
        >
          <FolderIcon sx={{ marginRight: "8px" }} />
          <li>Resources</li>
        </button>
      </ul>
    </div>
  );
}

export default Sidebar;
