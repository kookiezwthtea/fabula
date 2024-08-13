# Interactive Story App

This is an interactive story application built with React for the frontend and PHP for the backend. The app allows users to navigate through stories and make choices that affect the outcome of the narrative.

## Features

- **Interactive Stories**: Users can choose their own paths in stories, creating a unique experience each time.
- **Dynamic Story Management**: Stories, segments, and choices are managed dynamically through a database.
- **Twine Integration**: The app can display stories created with Twine, allowing for rich and complex narratives.
- **Responsive Design**: The app is designed to work well on a variety of devices, ensuring a great user experience across desktops, tablets, and smartphones.

## Technologies Used

- **Frontend**: React with Tailwind CSS for styling.
- **Backend**: PHP for handling API requests and MySQL for the database.
- **Routing**: React Router for navigation between different pages.
- **Database**: MySQL for storing stories, segments, and choices.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed to run the React development server.
- **PHP**: You need a PHP environment (e.g., XAMPP, MAMP) to run the backend.
- **MySQL**: Set up a MySQL database to store the story data.

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/kookiezwthtea/fabula.git
    cd story-app
    ```

2. **Install frontend dependencies**:

    ```bash
    cd frontend
    npm install
    ```

5. **Run the frontend**:

    ```bash
    npm run dev
    ```

6. **Access the app**:

    - Open your browser and go to `http://localhost:5173` to view the app.

## Usage

- **Homepage**: View all available stories in a card layout. Click on a story to start reading.
- **Story Page**: Make choices at each segment to progress through the story.
- **Navigation**: Use the "Go to Homepage" button to return to the list of stories.

## Customization

- **Adding New Stories**: You can add new stories directly through the MySQL database.
- **Styling**: Tailwind CSS is used for styling, making it easy to customize the look and feel of the app.

## Future Enhancements

- **User Authentication**: Allow users to save their progress in stories.
- **Story Editor**: Build a frontend tool for creating and editing stories directly from the app.
- **Enhanced Analytics**: Track user choices and story progression for data-driven insights.


## Acknowledgements

- **Twine**: For providing an amazing tool for creating interactive stories.
- **React**: For the robust frontend framework.
- **Tailwind CSS**: For making CSS styling straightforward and responsive.
