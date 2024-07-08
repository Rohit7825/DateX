"use client";

import * as React from "react";
import { Neo4JUser } from "@/types";
import TinderCard from "react-tinder-card";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { neo4JSwipe } from "@/app/neo4j.action";

interface HomePageProps {
  currentUser: Neo4JUser;
  users: Neo4JUser[];
}

const HomePageComponent = ({ currentUser, users }: HomePageProps) => {
  const handleSwipe = async (direction: string, userId: string) => {
    const isMatch = await neo4JSwipe(
      currentUser.applicationId,
      direction,
      userId
    );
    if (isMatch) alert(`Congrats !!! It's a match`);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div>
        <div>
          <h1 className="text-4xl">
            Hello {currentUser.firstname} {currentUser.lastname}
          </h1>
        </div>
        <div className="mt-5 relative">
          {users.map((user) => (
            <TinderCard
              onSwipe={(direction) =>
                handleSwipe(direction, user.applicationId)
              }
              className="absolute"
              key={user.applicationId}
            >
              <Card>
                <CardHeader>
                  <CardTitle>
                    {user.firstname} {user.lastname}
                  </CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </CardHeader>
              </Card>
            </TinderCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePageComponent;
